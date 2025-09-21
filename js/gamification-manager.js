// Gamification Manager
class GamificationManager {
  constructor() {
    this.state = {
      coins: 0,
      badges: [],
      streaks: { daily: 0, weekly: 0 },
    };
    this._loadState();
  }

  _log(...args) {
    if (false) console.log('[GamificationManager]', ...args); // Set to true for debugging
  }

  _loadState() {
    try {
      const data = localStorage.getItem('gm_state');
      if (data) {
        this.state = JSON.parse(data);
        this._log('Loaded state:', this.state);
      }
    } catch (err) {
      this._log('Load error:', err);
    }
  }

  _saveState() {
    try {
      localStorage.setItem('gm_state', JSON.stringify(this.state));
      this._log('Saved state:', this.state);
    } catch (err) {
      this._log('Save error:', err);
    }
  }

  getCoinBalance() {
    return this.state.coins || 0;
  }

  getCoins() {
    // Alias for getCoinBalance
    return this.getCoinBalance();
  }

  getBadgeList() {
    return Array.isArray(this.state.badges) ? this.state.badges : [];
  }

  getBadges() {
    // Alias for badge count
    return this.getBadgeList().length;
  }

  getStreak(type = 'daily') {
    return this.state.streaks && this.state.streaks[type] ? this.state.streaks[type] : 0;
  }

  addCoins(amount) {
    this.state.coins = (this.state.coins || 0) + amount;
    this._saveState();
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

export default GamificationManager;
