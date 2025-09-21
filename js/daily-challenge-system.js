// Daily Challenge System
class DailyChallengeSystem {
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
