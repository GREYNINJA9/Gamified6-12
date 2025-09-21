// STEM Village Game Engine
class GameEngine {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.options = options;
    this.running = false;
    this.lastFrame = 0;
    this.scene = null;
    this.input = { mouse: {}, touch: {} };
    this.setupInput();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }
  setupInput() {
    // Mouse/touch unified input
    this.canvas.addEventListener('mousedown', e => this.input.mouse = { x: e.offsetX, y: e.offsetY, down: true });
    this.canvas.addEventListener('mouseup', e => this.input.mouse.down = false);
    this.canvas.addEventListener('touchstart', e => {
      const t = e.touches[0];
      this.input.touch = { x: t.clientX, y: t.clientY, down: true };
    });
    this.canvas.addEventListener('touchend', e => this.input.touch.down = false);
  }
  resize() {
    // Mobile scaling
    this.canvas.width = window.innerWidth * 0.98;
    this.canvas.height = window.innerHeight * 0.7;
  }
  start(scene) {
    this.scene = scene;
    this.running = true;
    this.lastFrame = performance.now();
    requestAnimationFrame(this.loop.bind(this));
  }
  stop() {
    this.running = false;
  }
  loop(ts) {
    if (!this.running) return;
    const dt = (ts - this.lastFrame) / 1000;
    this.lastFrame = ts;
    if (this.scene && this.scene.update) this.scene.update(dt, this.input);
    if (this.scene && this.scene.render) this.scene.render(this.ctx);
    requestAnimationFrame(this.loop.bind(this));
  }
}
window.GameEngine = GameEngine;
