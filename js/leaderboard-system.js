// Leaderboard System
class LeaderboardSystem {
  // --- Quiz Leaderboard Categories ---
  updateQuizRank(userId, subject, score) {
    this.rankings.push({ userId, subject, score });
    this.rankings.sort((a, b) => b.score - a.score);
    this.save();
  }

  getQuizLeaderboard(subject, timeframe = 'week') {
    return this.rankings.filter(r => r.subject === subject).slice(0, 10);
  }

  getDailyQuizChampions() {
    // Stub: Return top daily quiz scorers
    return this.rankings.filter(r => r.subject && r.subject.includes('quiz')).slice(0, 3);
  }

  getQuizStreakLeaders() {
    // Stub: Return streak leaders
    return this.rankings.slice(0, 5);
  }

  startQuizCompetition(type, duration) {
    // Stub: Start competition
    this.competition = { type, duration, started: Date.now() };
  }

  getQuizLeaderboardTrends(timeframe = 'month') {
    // Stub: Return trends
    return { timeframe, trend: 'upward' };
  }
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
