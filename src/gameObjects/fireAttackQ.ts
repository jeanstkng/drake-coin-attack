import {
  Actor,
  Engine,
  Sprite,
  Vector,
  vec,
} from "excalibur";
import { Resources } from "../loader";

export class FireAttackQ extends Actor {
  private nearestActor?: Actor;
  private spriteFire?: Sprite;
  private movementResetCount = 0;
  private movementLimit = 2;

  onInitialize(engine: Engine): void {
    this.name = "fireAttackQ";
    this.spriteFire = new Sprite({
      image: Resources.FireboltImage,
    });
    this.graphics.add(this.spriteFire);
    this.actions.repeatForever((repeatCtx) => {
      repeatCtx.rotateBy(1, 10);
    });

    this.generateNewNearestActor(engine);
  }

  onPreUpdate(engine: Engine, _delta: number): void {
    if (
      this.nearestActor &&
      Vector.distance(this.pos, this.nearestActor!.pos) >= 5
    ) {
      const directionX = this.nearestActor!.pos.x - this.pos.x;
      const directionY = this.nearestActor!.pos.y - this.pos.y;

      const length = Math.sqrt(directionX ** 2 + directionY ** 2);
      const normalizedDirectionX = directionX / length;
      const normalizedDirectionY = directionY / length;

      this.vel = vec(normalizedDirectionX * 200, normalizedDirectionY * 200);
    } else {
      this.movementResetCount++;
      this.generateNewNearestActor(engine);
    }

    if (this.movementResetCount >= this.movementLimit) {
      this.kill();
    }
  }

  private generateNewNearestActor(engine: Engine) {
    const enemyActors = engine.currentScene.actors.filter(
      (actor) => actor.name === "enemy"
    );

    if (enemyActors.length == 0) {
      this.kill();
      return;
    }

    this.nearestActor = enemyActors.reduce(
      (closestActor: Actor, currentActor: Actor) => {
        const distance = Vector.distance(currentActor.pos, this.pos);
        if (
          !closestActor ||
          distance < Vector.distance(closestActor.pos, this.pos)
        ) {
          return currentActor;
        } else {
          return closestActor;
        }
      }
    );
  }
}
