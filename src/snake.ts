class Snake {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  width: number;
  height: number;
  tail: { x: number; y: number }[];
  tailLength: number;
  score: number;
  gameStarted: boolean;
  isGameOver: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  speed: number;

  constructor({
    canvas,
    ctx,
    position,
    speed = 4,
  }: {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    position: { x: number; y: number };
    speed?: number;
  }) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.position = position;
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 20;
    this.height = 20;
    this.tail = [];
    this.tailLength = 10;
    this.score = 0;
    this.gameStarted = false;
    this.isGameOver = false;
    this.speed = speed;

    for (let i = 0; i < this.tailLength; i++) {
      this.tail.push({
        x: this.position.x,
        y: this.position.y + this.tailLength,
      });
    }
  }

  draw() {
    this.ctx.fillStyle = 'green';
    this.ctx.fillRect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );

    for (let i = 0; i < this.tail.length; i++) {
      const tailSegment = this.tail[i];
      this.ctx.fillRect(tailSegment.x, tailSegment.y, this.width, this.height);
    }
  }

  update() {
    this.draw();

    if (
      this.position.y + this.velocity.y > 0 &&
      this.position.y + this.height + this.velocity.y < this.canvas.height
    ) {
      this.position.y += this.velocity.y;
    } else {
      this.gameOver();
      return;
    }

    if (
      this.position.x + this.velocity.x > 0 &&
      this.position.x + this.width + this.velocity.x < this.canvas.width
    ) {
      this.position.x += this.velocity.x;
    } else {
      this.gameOver();
      return;
    }

    if (this.checkSelfCollision()) {
      this.gameOver();
      return;
    }

    if (this.gameStarted) {
      this.updateTail();
    }
  }

  checkSelfCollision() {
    for (let i = 1; i < this.tail.length; i++) {
      if (
        this.position.x === this.tail[i].x &&
        this.position.y === this.tail[i].y
      ) {
        return true;
      }
    }
    return false;
  }

  increaseTailLength() {
    this.tailLength = this.tailLength + 10;
  }

  increaseSpeedBy(amount: number) {
    this.speed += amount;
  }

  updateTail() {
    const previousTailPosition = { x: this.position.x, y: this.position.y };
    this.tail.unshift(previousTailPosition);

    while (this.tail.length > this.tailLength) {
      this.tail.pop();
    }
  }

  gameOver() {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px Arial';
    this.ctx.fillText(
      'Game Over',
      this.canvas.width / 2 - 75,
      this.canvas.height / 2
    );
    this.isGameOver = true;
  }

  displayScore() {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '20px Arial';
    this.ctx.fillText('Score: ' + this.score, 10, 30);
  }
}

export default Snake;
