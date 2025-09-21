// Village Game
class VillageGame {
  constructor() {
    this.state = {};
    this.load();
  }
  load() {
    if (window.Offline) {
      Offline.get('village', 'state', val => { this.state = val || {}; });
    }
  }
  save() {
    if (window.Offline) {
      Offline.store('village', 'state', this.state);
    }
  }
  upgrade(building) {
    if (!this.state[building]) this.state[building] = 0;
    this.state[building]++;
    this.save();
    // Animation/notification stub
    if (window.showVillageUpgrade) showVillageUpgrade(building, this.state[building]);
  }
  getLevel(building) {
    return this.state[building] || 0;
  }
  getState() {
    return this.state;
  }
}
window.VillageGame = VillageGame;
