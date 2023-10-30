import Snake from './snake';
import Apple from './game-pickup-element/apple';
import PowerUp from './game-pickup-element/powerup';
import Obstacles from './obstacles';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const apple = new Apple({ canvas, ctx, position: { x: 200, y: 100 } });
const snake = new Snake({
  canvas,
  ctx,
  position: { x: 220, y: 200 },
});
const powerUp = new PowerUp({ canvas, ctx, position: { x: 250, y: 250 } });
const obstacles: Obstacles[] = [
  new Obstacles(100, 50, 100, 10, ctx),
  new Obstacles(100, 60, 10, 100, ctx),
];

function createObstacles() {
  if (snake.score > 0) {
    obstacles.forEach((obstacle) => {
      obstacle.draw();
    });
  }
}

function isCollision(
  rectA: { x: number; y: number; width: number; height: number },
  rectB: { x: number; y: number; width: number; height: number }
): boolean {
  return (
    rectA.x < rectB.x + rectB.width &&
    rectA.x + rectA.width > rectB.x &&
    rectA.y < rectB.y + rectB.height &&
    rectA.y + rectA.height > rectB.y
  );
}

function getSnakeHead(): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  return {
    x: snake.position.x,
    y: snake.position.y,
    width: snake.width,
    height: snake.height,
  };
}

function getObjectRect(
  position: { x: number; y: number },
  width: number,
  height: number
): { x: number; y: number; width: number; height: number } {
  return {
    x: position.x,
    y: position.y,
    width,
    height,
  };
}

function checkSnakeObstacleCollision() {
  for (const obstacle of obstacles) {
    if (obstacle.isDrawn) {
      const snakeHead = getSnakeHead();

      if (isCollision(snakeHead, obstacle)) {
        snake.gameOver();
      }
    }
  }
}

function checkSnakeAppleCollision() {
  const snakeHead = getSnakeHead();
  const appleRect = getObjectRect(apple.position, apple.width, apple.height);

  if (isCollision(snakeHead, appleRect)) {
    apple.getNewPosition();
    snake.increaseTailLength();
    snake.score += 1;
  }
}

function checkSnakePowerUpCollision() {
  const snakeHead = getSnakeHead();
  const powerUpRect = getObjectRect(
    powerUp.position,
    powerUp.width,
    powerUp.height
  );

  if (isCollision(snakeHead, powerUpRect)) {
    snake.increaseSpeedBy(0.1);
  }
}

// function checkSnakeObstacleCollision() {
//   const headX = snake.position.x;
//   const headY = snake.position.y;
//   const headWidth = snake.width;
//   const headHeight = snake.height;

//   for (const obstacle of obstacles) {
//     if (
//       headX < obstacle.x + obstacle.width &&
//       headX + headWidth > obstacle.x &&
//       headY < obstacle.y + obstacle.height &&
//       headY + headHeight > obstacle.y
//     ) {
//       snake.gameOver();
//     }
//   }
// }

// function checkSnakeAppleCollision() {
//   if (
//     snake.position.x < apple.position.x + apple.width &&
//     snake.position.x + snake.width > apple.position.x &&
//     snake.position.y < apple.position.y + apple.height &&
//     snake.position.y + snake.height > apple.position.y
//   ) {
//     apple.getNewPosition();
//     snake.increaseTailLength();
//     snake.score += 1;
//   }
// }

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgb(209, 184, 152)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  apple.update();
  powerUp.draw();

  createObstacles();
  checkSnakeAppleCollision();
  checkSnakePowerUpCollision();
  checkSnakeObstacleCollision();

  if (!snake.isGameOver) {
    snake.update();
  }

  snake.displayScore();
}

console.log(apple);
animate();

addEventListener('keydown', (event) => {
  snake.gameStarted = true;
  if (!snake.isGameOver) {
    switch (event.key) {
      case 'w':
        snake.velocity.y = -snake.speed;
        snake.velocity.x = 0;
        break;
      case 's':
        snake.velocity.y = snake.speed;
        snake.velocity.x = 0;
        break;
      case 'a':
        snake.velocity.x = -snake.speed;
        snake.velocity.y = 0;
        break;
      case 'd':
        snake.velocity.x = snake.speed;
        snake.velocity.y = 0;
        break;
    }
  }
});
