// Daily Challenge System
class DailyChallengeSystem {
  /**
   * Quiz session persistence and management
   */
  activeQuizSessions = {};

  /**
   * Generate a quiz challenge with mixed questions
   * @param {Object} opts
   * @returns {Object} challenge
   */
  generateQuizChallenge({subjects=['math','physics','chemistry','biology','technology'], difficulty='beginner', count=10}={}) {
    let questions = [];
    subjects.forEach(subj => {
      let pool = DailyChallengeSystem.QUESTION_BANK[subj].filter(q => q.difficulty === difficulty);
      for (let i = 0; i < Math.ceil(count / subjects.length); i++) {
        if (pool[i]) questions.push({ ...pool[i], subject: subj });
      }
    });
    questions = questions.sort(() => Math.random() - 0.5).slice(0, count);
    const challenge = {
      id: 'quiz-' + Date.now(),
      type: 'Mixed STEM Quiz',
      subjects,
      difficulty,
      questions,
      status: 'pending',
      started: null,
      completed: null,
      score: null
    };
    this.challenges.push(challenge);
    this.save();
    return challenge;
  }

  /**
   * Start a quiz session and persist progress
   * @param {string} challengeId
   * @returns {Object} { sessionId, questions }
   */
  startQuizSession(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge) return null;
    const sessionId = 'session-' + Date.now();
    this.activeQuizSessions[sessionId] = {
      challengeId,
      answers: {},
      current: 0,
      score: 0,
      started: Date.now(),
      completed: false
    };
    this.persistSessions();
    return { sessionId, questions: challenge.questions };
  }

  /**
   * Submit an answer for a quiz question
   * @param {string} sessionId
   * @param {string} questionId
   * @param {any} answer
   * @returns {Object} { correct, explanation }
   */
  submitQuizAnswer(sessionId, questionId, answer) {
    const session = this.activeQuizSessions[sessionId];
    if (!session) return null;
    const challenge = this.challenges.find(c => c.id === session.challengeId);
    if (!challenge) return null;
    const q = challenge.questions.find(q => q.id === questionId);
    if (!q) return null;
    session.answers[questionId] = answer;
    let correct = false;
    if (q.type === 'mcq' || q.type === 'fill' || q.type === 'short-text') correct = answer === q.answer;
    if (q.type === 'tf') correct = answer === q.answer;
    if (q.type === 'matching' && Array.isArray(answer) && Array.isArray(q.answer)) correct = JSON.stringify(answer) === JSON.stringify(q.answer);
    if (correct) session.score += 1;
    session.current++;
    this.persistSessions();
    // Emit analytics event for quiz answer
    this.emitActivityEvent({
      activityType: 'quiz_answer',
      studentId: window.userId || 'guest',
      classId: window.classId || '',
      subject: q.subject,
      questionId: q.id,
      correct,
      answer,
      difficulty: q.difficulty,
      timestamp: Date.now(),
      meta: { challengeId: challenge.id }
    });
    return { correct, explanation: q.explanation };
  }

  /**
   * Complete a quiz session, compute score, emit events
   * @param {string} sessionId
   * @returns {Object} session
   */
  completeQuizSession(sessionId) {
    const session = this.activeQuizSessions[sessionId];
    if (!session) return null;
    session.completed = true;
    const challenge = this.challenges.find(c => c.id === session.challengeId);
    if (challenge) {
      challenge.completed = Date.now();
      challenge.status = 'completed';
      challenge.score = session.score;
      this.completed.push(challenge.id);
      this.streak++;
      this.save();
      // Gamification/Leaderboard hooks
      if (window.GamificationManager) {
        GamificationManager.awardQuizRewards({score: session.score, subjects: challenge.subjects, difficulty: challenge.difficulty});
      }
      if (window.LeaderboardSystem) {
        LeaderboardSystem.updateQuizRank(window.userId || 'guest', challenge.subjects, session.score);
      }
      // Emit analytics event for quiz completion
      this.emitActivityEvent({
        activityType: 'quiz_complete',
        studentId: window.userId || 'guest',
        classId: window.classId || '',
        subject: challenge.subjects,
        score: session.score,
        maxScore: challenge.questions.length,
        difficulty: challenge.difficulty,
        timeTaken: challenge.completed - (session.started || Date.now()),
        timestamp: Date.now(),
        meta: { challengeId: challenge.id }
      });
    }
    this.persistSessions();
    return session;
  }

  /**
   * Complete a challenge (quiz or non-quiz)
   * @param {string} id
   * @param {Object} opts
   */
  completeChallenge(id, opts={}) {
    if (!this.completed.includes(id)) {
      this.completed.push(id);
      this.streak++;
      this.save();
      if (opts.type === 'quiz' && window.GamificationManager) {
        GamificationManager.awardQuizRewards(opts);
      }
      if (opts.type === 'quiz' && window.LeaderboardSystem) {
        LeaderboardSystem.updateQuizRank(window.userId || 'guest', opts.subjectBreakdown || [], opts.score);
      }
      if (window.showChallengeComplete) showChallengeComplete(id);
    }
  }

  /**
   * Persist active quiz sessions to Offline
   */
  persistSessions() {
    if (window.Offline) {
      Offline.store('quizSessions', 'active', this.activeQuizSessions);
    }
  }

  /**
   * Load active quiz sessions from Offline
   */
  loadSessions() {
    if (window.Offline) {
      Offline.get('quizSessions', 'active', val => {
        this.activeQuizSessions = val || {};
      });
    }
  }

  /**
   * Clear stale quiz sessions (older than 24h)
   */
  clearStaleSessions() {
    const now = Date.now();
    Object.keys(this.activeQuizSessions).forEach(sid => {
      if (now - this.activeQuizSessions[sid].started > 24*60*60*1000) {
        delete this.activeQuizSessions[sid];
      }
    });
    this.persistSessions();
  }

  /**
   * Resume interrupted quiz sessions
   */
  getActiveSessions() {
    return Object.entries(this.activeQuizSessions).map(([sid, sess]) => ({ sessionId: sid, ...sess }));
  }

  /**
   * Static/global initializer for UI integration
   */
  static init(elId) {
    if (!window.dailyChallenges) window.dailyChallenges = new DailyChallengeSystem();
    window.dailyChallenges.loadSessions();
    window.dailyChallenges.clearStaleSessions();
    if (elId) window.dailyChallenges.renderDailyChallenge(elId);
    return window.dailyChallenges;
  }

  /**
   * Render current daily challenge/quiz to DOM
   */
  renderDailyChallenge(elId) {
    const el = document.getElementById(elId);
    if (!el) return;
    const current = this.challenges[this.challenges.length-1];
    if (!current) {
      el.innerHTML = '<span>No daily challenge assigned.</span>';
      return;
    }
    el.innerHTML = `<span class="font-bold">${current.type || 'Daily Challenge'}</span> <span class="ml-2">${current.status === 'completed' ? 'Completed' : 'Active'}</span>`;
  }
  // --- Quiz System Extension ---
  static QUESTION_BANK = {
    math: [
      { id: 'm1', type: 'mcq', q: 'What is 7 x 8?', options: ['54', '56', '64', '58'], answer: '56', difficulty: 'beginner', explanation: '7 x 8 = 56.' },
      { id: 'm2', type: 'tf', q: 'Is 13 a prime number?', answer: true, difficulty: 'beginner', explanation: '13 is prime.' },
      { id: 'm3', type: 'fill', q: 'Square root of 81 is ___.', answer: '9', difficulty: 'beginner', explanation: '√81 = 9.' },
      // ...add 100+ math questions
    ],
    physics: [
      { id: 'p1', type: 'mcq', q: 'Unit of force?', options: ['Newton', 'Joule', 'Watt', 'Pascal'], answer: 'Newton', difficulty: 'beginner', explanation: 'Force is measured in Newtons.' },
      // ...add 100+ physics questions
    ],
    chemistry: [
      { id: 'c1', type: 'mcq', q: 'H2O is the chemical formula for?', options: ['Oxygen', 'Hydrogen', 'Water', 'Salt'], answer: 'Water', difficulty: 'beginner', explanation: 'H2O is water.' },
      // ...add 100+ chemistry questions
    ],
    biology: [
      { id: 'b1', type: 'tf', q: 'Plants make food by photosynthesis.', answer: true, difficulty: 'beginner', explanation: 'Photosynthesis is how plants make food.' },
      // ...add 100+ biology questions
    ],
    technology: [
      { id: 't1', type: 'mcq', q: 'HTML stands for?', options: ['Hyper Trainer Markup Language', 'Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks Text Mark Language'], answer: 'Hyper Text Markup Language', difficulty: 'beginner', explanation: 'HTML = Hyper Text Markup Language.' },
      // ...add 100+ technology questions
    ]
  };

  generateQuizChallenge({ subjects = ['math', 'physics', 'chemistry', 'biology', 'technology'], difficulty = 'beginner', count = 12 } = {}) {
    // Select questions from each subject, balanced
    let questions = [];
    subjects.forEach(subj => {
      let pool = DailyChallengeSystem.QUESTION_BANK[subj].filter(q => q.difficulty === difficulty);
      for (let i = 0; i < Math.ceil(count / subjects.length); i++) {
        if (pool[i]) questions.push({ ...pool[i], subject: subj });
      }
    });
    // Shuffle and trim
    questions = questions.sort(() => Math.random() - 0.5).slice(0, count);
    const challenge = {
      id: 'quiz-' + Date.now(),
      type: 'Mixed STEM Quiz',
      subjects,
      difficulty,
      questions,
      status: 'pending',
      started: null,
      completed: null,
      score: null
    };
    this.challenges.push(challenge);
    this.save();
    return challenge;
  }

  startQuizSession(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge) return null;
    challenge.started = Date.now();
    challenge.session = {
      answers: {},
      current: 0,
      score: 0,
      completed: false
    };
    this.save();
    return challenge;
  }

  submitQuizAnswer(challengeId, questionId, answer) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge || !challenge.session) return null;
    const q = challenge.questions.find(q => q.id === questionId);
    if (!q) return null;
    challenge.session.answers[questionId] = answer;
    // Scoring
    let correct = false;
    if (q.type === 'mcq' || q.type === 'fill') correct = answer === q.answer;
    if (q.type === 'tf') correct = answer === q.answer;
    // Drag-drop etc. can be added
    if (correct) challenge.session.score += 1;
    this.save();
    return { correct, explanation: q.explanation };
  }

  completeQuizSession(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge || !challenge.session) return null;
    challenge.completed = Date.now();
    challenge.status = 'completed';
    challenge.score = challenge.session.score;
    challenge.session.completed = true;
    this.completed.push(challenge.id);
    this.streak++;
    this.save();
    // Gamification integration
    if (window.GamificationManager) {
      GamificationManager.awardQuizRewards(challenge.score, challenge.subjects, challenge.difficulty);
    }
    // Leaderboard integration
    if (window.LeaderboardSystem) {
      LeaderboardSystem.updateQuizRank(window.userId || 'guest', challenge.subjects, challenge.score);
    }
    // Emit analytics event
    this.emitActivityEvent({
      type: 'quiz',
      studentId: window.userId || 'guest',
      classId: window.classId || '',
      subject: challenge.subjects,
      score: challenge.score,
      maxScore: challenge.questions.length,
      timeTaken: challenge.completed - (challenge.started || Date.now()),
      timestamp: Date.now(),
      meta: { challengeId: challenge.id }
    });
    return challenge;
  }
  // --- Analytics Event Emission ---
  emitActivityEvent(activityData) {
    if (window.TeacherAnalytics && TeacherAnalytics.emitActivityEvent) {
      TeacherAnalytics.emitActivityEvent(activityData);
    } else {
      window.dispatchEvent(new CustomEvent('sv-activity', { detail: activityData }));
    }
  }

  // --- Quiz Analytics Access ---
  async getQuizPerformance(studentId) {
    if (window.TeacherAnalytics) return await TeacherAnalytics.getStudentQuizAnalytics(studentId);
    return null;
  }
  async getClassQuizAnalytics(classId) {
    if (window.TeacherAnalytics) return await TeacherAnalytics.getClassQuizAnalytics(classId);
    return null;
  }
  async getTopicQuizBreakdown(classId, topic) {
    if (window.TeacherAnalytics) {
      const perf = await TeacherAnalytics.getClassQuizAnalytics(classId);
      return perf.topicDist?.[topic] || [];
    }
    return [];
  }

  // --- Real-time Analytics Support ---
  subscribeToQuizEvents(callback) {
    if (window.TeacherAnalytics && TeacherAnalytics.subscribeToActivityEvents) {
      TeacherAnalytics.subscribeToActivityEvents(ev => {
        if (ev.type === 'quiz') callback(ev);
      });
    }
  }

  // --- Data Export and Reporting ---
  async exportQuizData(format, filters) {
    // ...stub for export...
    return [];
  }

  getQuizProgress(challengeId) {
    const challenge = this.challenges.find(c => c.id === challengeId);
    if (!challenge || !challenge.session) return null;
    return {
      current: challenge.session.current,
      total: challenge.questions.length,
      score: challenge.session.score,
      completed: challenge.session.completed
    };
  }

  // Quiz analytics for teacher dashboard
  getQuizHistory() {
    return this.challenges.filter(c => c.type && c.type.includes('Quiz'));
  }

  getQuizStreak() {
    return this.streak;
  }

  // Existing challenge types maintained
  // ...existing code...
  constructor() {
    this.challenges = [];
    this.completed = [];
    this.streak = 0;
    this.load();
  }
  load() {
    if (window.Offline) {
      Offline.get('challenges', 'all', val => { this.challenges = val || []; });
      Offline.get('challenges', 'completed', val => { this.completed = val || []; });
      Offline.get('streaks', 'daily', val => { this.streak = val || 0; });
    }
  }
  save() {
    if (window.Offline) {
      Offline.store('challenges', 'all', this.challenges);
      Offline.store('challenges', 'completed', this.completed);
      Offline.store('streaks', 'daily', this.streak);
    }
  }
  generateChallenge() {
    // Stub: Generate a random challenge
    let types = ['Quick Math', 'Science Trivia', 'Physics Puzzle', 'Chemistry Quiz', 'Coding Logic', 'STEM Riddles'];
    let type = types[Math.floor(Math.random() * types.length)];
    let challenge = { type, id: Date.now(), desc: type + ' challenge!' };
    this.challenges.push(challenge);
    this.save();
    return challenge;
  }
  completeChallenge(id) {
    if (!this.completed.includes(id)) {
      this.completed.push(id);
      this.streak++;
      this.save();
      if (window.showChallengeComplete) showChallengeComplete(id);
    }
  }
  getCurrentChallenge() {
    return this.challenges[this.challenges.length - 1];
  }
  getStreak() {
    return this.streak;
  }
}
window.DailyChallengeSystem = DailyChallengeSystem;
