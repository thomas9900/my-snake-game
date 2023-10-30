import GamePickupElement from './gamePickupElement';

class Apple extends GamePickupElement {
  constructor({
    canvas,
    ctx,
    position,
  }: {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    position: { x: number; y: number };
  }) {
    super(position.x, position.y, 20, 20, canvas, ctx);
  }

  draw() {
    super.draw('red');
  }

  update() {
    this.draw();
  }

  getNewPosition() {
    this.position.x = Math.floor(Math.random() * this.canvas.width);
    this.position.y = Math.floor(Math.random() * this.canvas.height);
  }
}

export default Apple;
