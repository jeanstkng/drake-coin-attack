import { Actor, Engine, vec, Sprite, Vector } from "excalibur";
import { Resources } from "../loader";

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

  onInitialize(_engine: Engine): void {
    this.graphics.add(this.drakeImg);
    this.randomTime = Math.floor(this.getRandomArbitrary(3000, 5000));

    this.randomDirection = vec(
      this.getRandomArbitrary(-1, 1) * this.speed,
      this.getRandomArbitrary(-1, 1) * this.speed
    );
  }

  onPreUpdate(_engine: Engine, delta: number): void {
    this.animateOffset();

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
