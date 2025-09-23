class GamificationManager {
  // --- Unified Game Reward Method ---
  awardGameRewards(subject, score, difficulty, duration) {
    let base = score * 2;
    if (difficulty === 'intermediate') base *= 1.5;
    if (difficulty === 'advanced') base *= 2;
    base += Math.floor(duration / 30);
    this.state.gameStreaks ||= {};
    this.state.gameStreaks[subject] = (this.state.gameStreaks[subject] || 0) + 1;
    base += this.state.gameStreaks[subject] * 3;
    this.addCoins(Math.round(base));
    if (score >= 10) this.addBadge(subject + ' Champion');
    if (difficulty === 'advanced' && score >= 10) this.addBadge(subject + ' Genius');
    if (duration > 100) this.addBadge('Persistence Award');
    if (window.VillageGame) VillageGame.upgradeFromGame?.(subject, score);
    if (window.LeaderboardSystem) LeaderboardSystem.updateGameRank?.(window.userId || 'guest', subject, score);
    this._saveState();
    // Emit analytics event
    this.emitActivityEvent({
      activityType: 'game',
      studentId: window.userId || 'guest',
      classId: window.classId || '',
      subject,
      score,
      difficulty,
      duration,
      timestamp: Date.now(),
      meta: { streak: this.state.gameStreaks[subject] }
    });
    return { coins: Math.round(base) };
  }

  // --- Quiz Reward Method with Analytics Event ---
  awardQuizRewards(subject, score, difficulty, duration, quizId) {
    let base = score * 2;
    if (difficulty === 'intermediate') base *= 1.5;
    if (difficulty === 'advanced') base *= 2;
    base += Math.floor(duration / 30);
    this.state.quizStreaks ||= {};
    this.state.quizStreaks[subject] = (this.state.quizStreaks[subject] || 0) + 1;
    base += this.state.quizStreaks[subject] * 2;
    this.addCoins(Math.round(base));
    if (score === 10) this.addBadge(subject + ' Quiz Master');
    if (difficulty === 'advanced' && score >= 8) this.addBadge(subject + ' Quiz Genius');
    if (duration > 100) this.addBadge('Quiz Persistence');
    this._saveState();
    // Emit analytics event for quiz
    this.emitActivityEvent({
      activityType: 'quiz',
      studentId: window.userId || 'guest',
      classId: window.classId || '',
      subject,
      score,
      difficulty,
      duration,
      quizId,
      timestamp: Date.now(),
      meta: { streak: this.state.quizStreaks[subject] }
    });
    return { coins: Math.round(base) };
  }
  // --- Analytics Event Emission ---
  emitActivityEvent(activityData) {
    if (window.TeacherAnalytics && TeacherAnalytics.emitActivityEvent) {
      TeacherAnalytics.emitActivityEvent(activityData);
    } else {
      window.dispatchEvent(new CustomEvent('sv-activity', { detail: activityData }));
    }
  }

  // --- Enhanced Data Access Methods ---
  async getStudentPerformanceData(studentId, timeframe) {
    // Return detailed analytics for student
    if (window.TeacherAnalytics) return await TeacherAnalytics.getStudentAnalytics(studentId);
    return null;
  }
  async getClassEngagementMetrics(classId) {
    if (window.TeacherAnalytics) return await TeacherAnalytics.getClassPerformance(classId);
    return null;
  }
  async getSubjectPerformanceBreakdown(classId, subject) {
    if (window.TeacherAnalytics) {
      const perf = await TeacherAnalytics.getClassPerformance(classId);
      return perf.subjectDist?.[subject] || [];
    }
    return [];
  }
  async getWeakPerformanceIndicators(studentId) {
    if (window.TeacherAnalytics) {
      const s = await TeacherAnalytics.getStudentAnalytics(studentId);
      // Return topics with <60% score
      if (s.perf && s.perf.topicScores) {
        return Object.entries(s.perf.topicScores).filter(([t, v]) => v < 60).map(([t, v]) => ({ topic: t, score: v }));
      }
    }
    return [];
  }

  // --- Performance Analytics Integration ---
  async calculateEngagementScore(studentId) {
    if (window.TeacherAnalytics) return await TeacherAnalytics.getStudentEngagement(studentId);
    return 0;
  }
  async getPerformanceTrends(studentId, timeframe) {
    if (window.TeacherAnalytics) {
      const s = await TeacherAnalytics.getStudentAnalytics(studentId);
      return s.perf?.trend || 0;
    }
    return 0;
  }
  async getTopicMasteryLevels(studentId) {
    if (window.TeacherAnalytics) {
      const s = await TeacherAnalytics.getStudentAnalytics(studentId);
      return s.perf?.topicScores || {};
    }
    return {};
  }
  async getPeerComparisonMetrics(studentId, classId) {
    if (window.TeacherAnalytics) {
      const perf = await TeacherAnalytics.getClassPerformance(classId);
      // Compare student to class avg
      const s = await TeacherAnalytics.getStudentAnalytics(studentId);
      return { student: s, classAvg: perf.avg };
    }
    return {};
  }

  // --- Advanced Achievement Analytics ---
  async getBadgeEarningPatterns(classId) {
    // Analyze badge distribution
    if (window.TeacherAnalytics) {
      const perf = await TeacherAnalytics.getClassPerformance(classId);
      // ...badge analysis...
      return perf.raw.map(s => s.badges?.length || 0);
    }
    return [];
  }
  async getStreakAnalytics(classId) {
    if (window.TeacherAnalytics) {
      const perf = await TeacherAnalytics.getClassPerformance(classId);
      return perf.raw.map(s => s.streaks?.daily || 0);
    }
    return [];
  }
  async getMotivationIndicators(studentId) {
    // Analyze reward response patterns
    // ...stub...
    return {};
  }
  async getCollaborationMetrics(classId) {
    // Peer learning assessment
    // ...stub...
    return {};
  }

  // --- Real-time Analytics Support ---
  subscribeToAnalyticsEvents(callback) {
    if (window.TeacherAnalytics) TeacherAnalytics.subscribeToActivityEvents(callback);
  }
  async getRecentActivitySummary(timeframe) {
    if (window.Offline && Offline.getRecentActivitySummary) {
      return new Promise(resolve => Offline.getRecentActivitySummary('', 20, resolve));
    }
    return [];
  }
  async getCurrentEngagementStatus(classId) {
    // Real-time engagement monitoring
    // ...stub...
    return {};
  }
  async getActiveStudentCount(classId) {
    // Live participation tracking
    // ...stub...
    return 0;
  }

  // --- Data Export and Reporting ---
  async exportGamificationData(format, filters) {
    // ...stub for export...
    return [];
  }
  async generateMotivationReport(studentId) {
    // ...stub for report...
    return {};
  }
  async getClassGamificationSummary(classId) {
    // ...stub for summary...
    return {};
  }
  async getParentProgressSummary(studentId) {
    // ...stub for parent...
    return {};
  }

  // --- Integration Enhancements ---
  // (Assignment, village, leaderboard, cross-system validation, etc. can be added here)

  calculateGameCoins(score, difficulty, duration, streak) {
    let base = score * 2;
    if (difficulty === 'intermediate') base *= 1.5;
    if (difficulty === 'advanced') base *= 2;
    base += Math.floor(duration / 30);
    base += (streak || 0) * 3;
    return Math.round(base);
  }

  updateGameStreak(subject) {
    this.state.gameStreaks ||= {};
    this.state.gameStreaks[subject] = (this.state.gameStreaks[subject] || 0) + 1;
    this._saveState();
  }

  checkGameBadges({ subject, gameType, score, difficulty, timeSpent }) {
    if (score >= 10) this.addBadge(subject.charAt(0).toUpperCase() + subject.slice(1) + ' Master');
    if (difficulty === 'advanced' && score >= 10) this.addBadge(subject.charAt(0).toUpperCase() + subject.slice(1) + ' Genius');
    if (timeSpent > 100) this.addBadge('Persistence Award');
    if (gameType === 'quiz' && score === 10) this.addBadge('Quiz Perfectionist');
    this._saveState();
  }
  // --- Unified Game Reward Method ---
  awardGameRewards(subject, score, difficulty, duration) {
    let base = score * 2;
    if (difficulty === 'intermediate') base *= 1.5;
    if (difficulty === 'advanced') base *= 2;
    base += Math.floor(duration / 30);
    this.state.gameStreaks ||= {};
    this.state.gameStreaks[subject] = (this.state.gameStreaks[subject] || 0) + 1;
    base += this.state.gameStreaks[subject] * 3;
    this.addCoins(Math.round(base));
    if (score >= 10) this.addBadge(subject + ' Champion');
    if (difficulty === 'advanced' && score >= 10) this.addBadge(subject + ' Genius');
    if (duration > 100) this.addBadge('Persistence Award');
    if (window.VillageGame) VillageGame.upgradeFromGame?.(subject, score);
    if (window.LeaderboardSystem) LeaderboardSystem.updateGameRank?.(window.userId || 'guest', subject, score);
    this._saveState();
    return { coins: Math.round(base) };
  }

  calculateGameCoins(score, difficulty, duration, streak) {
    let base = score * 2;
    if (difficulty === 'intermediate') base *= 1.5;
    if (difficulty === 'advanced') base *= 2;
    base += Math.floor(duration / 30);
    base += (streak || 0) * 3;
    return Math.round(base);
  }

  updateGameStreak(subject) {
    this.state.gameStreaks ||= {};
    this.state.gameStreaks[subject] = (this.state.gameStreaks[subject] || 0) + 1;
    this._saveState();
  }

  checkGameBadges({ subject, gameType, score, difficulty, timeSpent }) {
    if (score >= 10) this.addBadge(subject.charAt(0).toUpperCase() + subject.slice(1) + ' Master');
    if (difficulty === 'advanced' && score >= 10) this.addBadge(subject.charAt(0).toUpperCase() + subject.slice(1) + ' Genius');
    if (timeSpent > 100) this.addBadge('Persistence Award');
    if (gameType === 'quiz' && score === 10) this.addBadge('Quiz Perfectionist');
    this._saveState();
  }

  // --- Assignment Reward System ---
  awardAssignmentRewards(assignmentId, score, submissionTime, difficulty) {
    let base = score * 2;
    if (difficulty === 'advanced') base *= 2;
    if (submissionTime < 0) base += 10;
    if (submissionTime > 0) base -= Math.min(submissionTime, 10);
    this.addCoins(Math.max(1, Math.round(base)));
    this.state.assignmentStreaks ||= {};
    this.state.assignmentStreaks[assignmentId] = (this.state.assignmentStreaks[assignmentId] || 0) + 1;
    if (score === 10) this.addBadge('Perfect Submission');
    if (submissionTime < 0) this.addBadge('Early Bird');
    if (this.state.assignmentStreaks[assignmentId] >= 10) this.addBadge('Assignment Master');
    this._saveState();
    return { coins: Math.round(base) };
  }

  getAssignmentPerformance(studentId, timeframe = 'month') {
    return { studentId, timeframe, completionRate: 0.9, avgScore: 8.5, streak: 5 };
  }

  addBadge(badge) {
    if (!this.state.badges.includes(badge)) {
      this.state.badges.push(badge);
      this._saveState();
    }
  }

  incrementStreak(type = 'daily') {
    if (!this.state.streaks) this.state.streaks = {};
    this.state.streaks[type] = (this.state.streaks[type] || 0) + 1;
    this._saveState();
  }
}


// Instantiate and expose as browser-global singleton
window.GamificationManager = new GamificationManager();
