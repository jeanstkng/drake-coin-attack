import { Actor, Engine, Sprite, Vector, vec } from "excalibur";
import { Resources } from "../loader";

export class FireAttackBasic extends Actor {
  private nearestActor?: Actor;
  private spriteFire?: Sprite;

  onInitialize(engine: Engine): void {
    this.name = "fireAttackBasic";
    this.spriteFire = new Sprite({
      image: Resources.FireBasicImage,
      scale: vec(0.5, 0.5),
    });
    this.graphics.add(this.spriteFire);

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

    this.rotation =
      this.calculateRotationAngleInRadians(this.pos, this.nearestActor.pos) * 3;
  }

  onPreUpdate(_engine: Engine, _delta: number): void {
    if (
      this.nearestActor &&
      Vector.distance(this.pos, this.nearestActor!.pos) <= 600
    ) {
      const directionX = this.nearestActor!.pos.x - this.pos.x;
      const directionY = this.nearestActor!.pos.y - this.pos.y;

      const length = Math.sqrt(directionX ** 2 + directionY ** 2);
      const normalizedDirectionX = directionX / length;
      const normalizedDirectionY = directionY / length;

      this.vel = vec(normalizedDirectionX * 100, normalizedDirectionY * 100);
    }

    if (this.nearestActor?.isKilled()) {
      this.kill();
    }
  }

  private calculateRotationAngleInRadians(vector1: Vector, vector2: Vector) {
    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y;
    const magnitude1 = Math.sqrt(vector1.x ** 2 + vector1.y ** 2);
    const magnitude2 = Math.sqrt(vector2.x ** 2 + vector2.y ** 2);

    const angleInRadians = Math.acos(dotProduct / (magnitude1 * magnitude2));

    return angleInRadians;
  }
}
