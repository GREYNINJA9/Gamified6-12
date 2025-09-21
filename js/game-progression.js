// Game Progression Manager
class ProgressionManager {
  constructor() {
    this.progress = {};
  }
  load() {
    // Load progress from Offline
    if (window.Offline) {
      Offline.get('progress', 'games', data => {
        this.progress = data || {};
      });
    }
  }
  save() {
    if (window.Offline) {
      Offline.store('progress', 'games', this.progress);
    }
  }
  update(game, level, stars) {
    this.progress[game] = { level, stars };
    this.save();
  }
  get(game) {
    return this.progress[game] || { level: 0, stars: 0 };
  }
}
window.ProgressionManager = ProgressionManager;
