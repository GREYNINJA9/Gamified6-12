// Low Poly Renderer
class LowPolyRenderer {
  constructor(ctx) {
    this.ctx = ctx;
  }
  drawPolygon(points, color) {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i][0], points[i][1]);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.restore();
  }
  drawGradientPolygon(points, color1, color2) {
    // Simple gradient fill
    const minY = Math.min(...points.map(p => p[1]));
    const maxY = Math.max(...points.map(p => p[1]));
    const grad = this.ctx.createLinearGradient(0, minY, 0, maxY);
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      this.ctx.lineTo(points[i][0], points[i][1]);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = grad;
    this.ctx.fill();
    this.ctx.restore();
  }
}
window.LowPolyRenderer = LowPolyRenderer;
