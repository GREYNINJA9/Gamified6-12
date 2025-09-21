// Gamification Manager
class GamificationManager {
  constructor() {
    this.coins = 0;
    this.badges = [];
    this.streaks = { daily: 0, activity: 0, perfect: 0 };
    this.load();
  }
  load() {
    if (window.Offline) {
      Offline.get('coins', 'balance', val => { this.coins = val || 0; });
      Offline.get('badges', 'all', val => { this.badges = val || []; });
      Offline.get('streaks', 'all', val => { this.streaks = val || { daily: 0, activity: 0, perfect: 0 }; });
    }
  }
  save() {
    if (window.Offline) {
      Offline.store('coins', 'balance', this.coins);
      Offline.store('badges', 'all', this.badges);
      Offline.store('streaks', 'all', this.streaks);
    }
  }
  earnCoins(amount, reason) {
    this.coins += amount;
    this.save();
    // Animation/notification stub
    if (window.showCoinAnimation) showCoinAnimation(amount, reason);
  }
  spendCoins(amount) {
    if (this.coins >= amount) {
      this.coins -= amount;
      this.save();
      return true;
    }
    return false;
  }
  unlockBadge(badge) {
    if (!this.badges.includes(badge)) {
      this.badges.push(badge);
      this.save();
      if (window.showBadgeUnlock) showBadgeUnlock(badge);
    }
  }
  updateStreak(type, value) {
    this.streaks[type] = value;
    this.save();
  }
  getBadgeList() {
    return this.badges;
  }
  getCoinBalance() {
    return this.coins;
  }
  getStreak(type) {
    return this.streaks[type] || 0;
  }
}
window.GamificationManager = GamificationManager;
