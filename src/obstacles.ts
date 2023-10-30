class Obstacles {
  x: number;
  y: number;
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  isDrawn: boolean;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.ctx = ctx;
    this.isDrawn = false;
  }

  draw() {
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.isDrawn = true;
  }
}

export default Obstacles;
