import { Actor, Engine, vec } from "excalibur";
import { Enemy } from "./enemy";
import { drake } from "./drake";

export class EnemySpawner extends Actor {
  private spawnTimer: number = 0;
  private spawnDelay: number = 1000;

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.spawnTimer >= this.spawnDelay) {
      const newEnemy: Enemy = new Enemy(
        {
          pos: vec(drake.pos.x + 200, drake.pos.y + 200),
          width: 32,
          height: 32,
          z: 14,
        },
        drake
      );

      engine.add(newEnemy);
      this.spawnTimer = 0;
    } else {
      this.spawnTimer += delta;
    }
  }
}

export const enemySpawner: EnemySpawner = new EnemySpawner();