export interface AppleType {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  position: { x: number; y: number };
  width: number;
  height: number;
}

export interface SnakeType {
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
  apple: AppleType;
}
