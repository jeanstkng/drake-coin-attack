import {
  Actor,
  Engine,
  vec,
  Sprite,
  Vector,
  CollisionType,
  Keys,
} from "excalibur";
import { Resources, loader } from "../loader";
import { FireAttackBasic } from "./fireAttackBasic";
import { FireAttackQ } from "./fireAttackQ";

export class Drake extends Actor {
  private isOffsetGoingUp: boolean = true;
  private actualOffset: number = 0;
  private drakeImg: Sprite = new Sprite({
    image: Resources.DrakeImage,
  });
  private randomDirection: Vector = new Vector(0, 0);
  private randomTime: number = 0;
  private timerCounter: number = 0;
  private speed: number = 100;
  private coins: number = 1000;

  private basicAttackCooldown: number = 3000;
  private basicAttackTimer: number = 0;

  private qAttackCooldown: number = 5000;
  private qAttackTimer: number = 0;
  private canUseQAttack: boolean = true;

  onInitialize(engine: Engine): void {
    this.reduceCoins(0);

    this.name = "drake";
    this.graphics.add(this.drakeImg);
    this.randomTime = Math.floor(this.getRandomArbitrary(3000, 5000));

    this.randomDirection = vec(
      this.getRandomArbitrary(-1, 1) * this.speed,
      this.getRandomArbitrary(-1, 1) * this.speed
    );

    engine.input.keyboard.on("release", (keyEv) => {
      if (keyEv.key === Keys.Q && this.canUseQAttack) {
        this.reduceCoins(50);
        this.canUseQAttack = false;
        document.getElementById("q-button")!.style.opacity = "0.25";
        engine.add(
          new FireAttackQ({
            z: 15,
            pos: this.pos,
            width: 64,
            height: 64,
            collisionType: CollisionType.Passive,
          })
        );
      }
    });
  }

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.coins <= 0) {
      this.vel = Vector.Zero;
      return;
    }

    this.animateOffset();

    if (this.basicAttackTimer >= this.basicAttackCooldown) {
      this.basicAttackTimer = 0;
      engine.add(
        new FireAttackBasic({
          z: 15,
          pos: this.pos,
          width: 24,
          height: 24,
          collisionType: CollisionType.Passive,
        })
      );
    } else {
      this.basicAttackTimer += delta;
    }

    if (this.qAttackTimer >= this.qAttackCooldown && !this.canUseQAttack) {
      this.qAttackTimer = 0;
      document.getElementById("q-button")!.style.opacity = "1";
      this.canUseQAttack = true;
    } else {
      this.qAttackTimer += delta;
    }

    if (this.timerCounter >= this.randomTime) {
      this.randomTime = Math.floor(this.getRandomArbitrary(3000, 5000));
      this.generateRandomDirection();
      this.timerCounter = 0;
    } else {
      this.timerCounter += delta;
    }

    this.vel = this.randomDirection;
    if (
      this.pos.x <= 100 ||
      this.pos.x >= 3100 ||
      this.pos.y <= 100 ||
      this.pos.y >= 3100
    ) {
      this.generateRandomDirection();
      this.vel = this.randomDirection;
    }
  }

  public setCoins(quantity: number) {
    this.coins = quantity;
  }

  public getCoins() {
    return this.coins;
  }

  public reduceCoins(quantity: number) {
    this.setCoins(this.getCoins() - quantity);

    document.getElementById("actualCoins")!.innerText = `${this.getCoins()}`;
  }

  public incrementCoins(quantity: number) {
    this.setCoins(this.getCoins() + quantity);

    document.getElementById("actualCoins")!.innerText = `${this.getCoins()}`;
  }

  private generateRandomDirection() {
    this.randomDirection = vec(
      this.getRandomArbitrary(-1, 1) * this.speed,
      this.getRandomArbitrary(-1, 1) * this.speed
    );
  }

  private getRandomArbitrary(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  private animateOffset(): void {
    if (this.actualOffset <= -1 && this.isOffsetGoingUp) {
      this.isOffsetGoingUp = false;
    } else if (this.actualOffset >= 1 && !this.isOffsetGoingUp) {
      this.isOffsetGoingUp = true;
    }

    if (this.isOffsetGoingUp) {
      this.decrementOffset();
      return;
    }

    this.incrementOffset();
  }

  private decrementOffset(): void {
    this.actualOffset -= 0.1;
    this.graphics.offset.y -= 0.1;
  }

  private incrementOffset(): void {
    this.actualOffset += 0.1;
    this.graphics.offset.y += 0.1;
  }
}

export const drake: Drake = new Drake({
  width: 48,
  height: 48,
  pos: vec(1600, 1600),
  z: 15,
});
