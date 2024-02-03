import { Actor, Animation, Engine, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../loader";
import { Drake, drake } from "./drake";

export class Enemy extends Actor {
  private drake: Drake;
  private speed: number = 100;

  constructor(args: object, drake: Drake) {
    super(args);
    this.drake = drake;
  }

  onInitialize(_engine: Engine): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.WarriorYellowSpriteSheet,
      grid: {
        rows: 8,
        columns: 6,
        spriteWidth: 192,
        spriteHeight: 192,
      },
    });

    const rightIdle = new Animation({
      frames: [
        { graphic: spriteSheet.getSprite(0, 0) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(1, 0) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(2, 0) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(3, 0) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(4, 0) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(5, 0) as ex.Sprite, duration: 200 },
      ],
      scale: vec(0.5, 0.5),
    });
    this.graphics.add("right-idle", rightIdle);
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use("right-idle");

    if (
      Vector.distance(this.pos, this.drake.pos) <= 600 &&
      Vector.distance(this.pos, this.drake.pos) >= 64
    ) {
      // Calculate the direction vector from enemy to drake
      const directionX = this.drake.pos.x - this.pos.x;
      const directionY = this.drake.pos.y - this.pos.y;

      // Normalize the direction vector
      const length = Math.sqrt(directionX ** 2 + directionY ** 2);
      const normalizedDirectionX = directionX / length;
      const normalizedDirectionY = directionY / length;

      this.vel = vec(
        normalizedDirectionX * this.speed,
        normalizedDirectionY * this.speed
      );
    } else if (Vector.distance(this.pos, this.drake.pos) >= 800) {
        this.kill();
    }
  }
}

export const enemy: Enemy = new Enemy(
  {
    width: 32,
    height: 32,
    pos: vec(1600, 1700),
    z: 14,
  },
  drake
);
