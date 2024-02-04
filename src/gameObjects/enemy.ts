import { Actor, Animation, Engine, SpriteSheet, Vector, vec } from "excalibur";
import { Resources } from "../loader";
import { Drake } from "./drake";

export class Enemy extends Actor {
  private drake: Drake;
  private speed: number = 100;
  private health: number = 100;

  private attackCooldown: number = 2000;
  private attackTimer: number = 0;
  private canAttack: boolean = true;

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
      scale: vec(0.3, 0.3),
    });
    this.graphics.add("right-walk", rightWalk);

    this.on("collisionstart", (precollisionEv) => {
      switch (precollisionEv.other.name) {
        case "fireAttackBasic":
          this.health -= 50;
          precollisionEv.other.kill();

          if (this.health <= 0) {
            this.kill();
          }
          break;
        case "fireAttackQ":
          this.health -= 100;

          if (this.health <= 0) {
            this.kill();
          }
          break;
        case "drake":
          if (this.canAttack) {
            this.drake.reduceCoins(1);
            this.canAttack = false;
          }
          break;
        default:
          break;
      }
    });
  }

  onPreUpdate(_engine: Engine, delta: number): void {
    if (this.drake.getCoins() <= 0) {
      this.kill();
      return;
    }

    if (!this.canAttack && this.attackTimer >= this.attackCooldown) {
      this.attackTimer = 0;
      this.canAttack = true;
    } else {
      this.attackTimer += delta;
    }

    this.graphics.use("right-walk");
    if (this.vel.x > 0.01) {
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
