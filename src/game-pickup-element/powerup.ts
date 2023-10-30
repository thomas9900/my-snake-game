import GamePickupElement from './gamePickupElement';

class PowerUp extends GamePickupElement {
  constructor({
    canvas,
    ctx,
    position,
  }: {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    position: { x: number; y: number };
  }) {
    super(position.x, position.y, 15, 15, canvas, ctx);
  }

  draw() {
    super.draw('blue');
  }
}

export default PowerUp;
