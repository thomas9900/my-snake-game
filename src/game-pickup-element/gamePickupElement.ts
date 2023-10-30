class GamePickupElement {
  position: { x: number; y: number };
  width: number;
  height: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    this.position = { x, y };
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.ctx = ctx;
  }

  draw(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

export default GamePickupElement;
