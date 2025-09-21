// Leaderboard System
class LeaderboardSystem {
  constructor() {
    this.rankings = [];
    this.load();
  }
  load() {
    if (window.Offline) {
      Offline.get('leaderboard', 'all', val => { this.rankings = val || []; });
    }
  }
  save() {
    if (window.Offline) {
      Offline.store('leaderboard', 'all', this.rankings);
    }
  }
  updateRank(userId, score) {
    let found = this.rankings.find(r => r.userId === userId);
    if (found) found.score = score;
    else this.rankings.push({ userId, score });
    this.rankings.sort((a, b) => b.score - a.score);
    this.save();
  }
  getRank(userId) {
    let idx = this.rankings.findIndex(r => r.userId === userId);
    return idx >= 0 ? idx + 1 : null;
  }
  getTop(n) {
    return this.rankings.slice(0, n);
  }
}
window.LeaderboardSystem = LeaderboardSystem;
