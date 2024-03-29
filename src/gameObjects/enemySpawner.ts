import {
  Actor,
  CollisionGroup,
  CollisionType,
  Color,
  Engine,
  vec,
} from "excalibur";
import { Enemy } from "./enemy";
import { drake } from "./drake";

export class EnemySpawner extends Actor {
  private spawnTimer: number = 0;
  private spawnDelay: number = 1000;

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.spawnTimer >= this.spawnDelay) {
      const newEnemy: Enemy = new Enemy(
        {
          pos: vec(
            drake.pos.x + this.getRandomArbitrary(-300, 300, -200, 200),
            drake.pos.y + this.getRandomArbitrary(-300, 300, -200, 200)
          ),
          width: 24,
          height: 24,
          z: 14,
          color: Color.Blue,
          collisionType: CollisionType.Active,
          collisionGroup: CollisionGroup.All,
        },
        drake
      );

      engine.add(newEnemy);
      this.spawnTimer = 0;
    } else {
      this.spawnTimer += delta;
    }
  }

  private getRandomArbitrary(
    min: number,
    max: number,
    excludeMin: number,
    excludeMax: number
  ) {
    let randomValue;
    do {
      randomValue = Math.random() * (max - min) + min;
    } while (randomValue >= excludeMin && randomValue <= excludeMax);

    return randomValue;
  }
}

export const enemySpawner: EnemySpawner = new EnemySpawner();
