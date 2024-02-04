import {
  Actor,
  Animation,
  Collider,
  CollisionContact,
  Engine,
  Side,
  SpriteSheet,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../loader";
import { Drake } from "./drake";

export class Enemy extends Actor {
  private drake: Drake;
  private speed: number = 100;
  private health: number = 100;

  constructor(args: object, drake: Drake) {
    super(args);
    this.name = "enemy";
    this.drake = drake;
  }

  onInitialize(_engine: Engine): void {
    this.speed = this.getRandomArbitrary(30, 100);

    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.WarriorYellowSpriteSheet,
      grid: {
        rows: 8,
        columns: 6,
        spriteWidth: 192,
        spriteHeight: 192,
      },
    });

    const rightWalk = new Animation({
      frames: [
        { graphic: spriteSheet.getSprite(0, 1) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(1, 1) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(2, 1) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(3, 1) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(4, 1) as ex.Sprite, duration: 200 },
        { graphic: spriteSheet.getSprite(5, 1) as ex.Sprite, duration: 200 },
      ],
      scale: vec(0.5, 0.5),
    });
    this.graphics.add("right-walk", rightWalk);

    this.on("collisionstart", (precollisionEv) => {
      if (precollisionEv.other.name === "fireAttackBasic") {
        this.health -= 50;
        precollisionEv.other.kill();

        if (this.health <= 0) {
          this.kill();
        }
      }
    });
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    this.graphics.use("right-walk");
    if (this.vel.x > 0) {
      this.graphics.flipHorizontal = false;
    } else {
      this.graphics.flipHorizontal = true;
    }

    if (
      Vector.distance(this.pos, this.drake.pos) <= 600 &&
      Vector.distance(this.pos, this.drake.pos) >= 64
    ) {
      const directionX = this.drake.pos.x - this.pos.x;
      const directionY = this.drake.pos.y - this.pos.y;

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

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }
}
