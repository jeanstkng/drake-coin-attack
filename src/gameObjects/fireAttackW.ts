import { Actor, Animation, Engine, SpriteSheet, vec } from "excalibur";
import { Resources } from "../loader";

export class FireAttackW extends Actor {
  private spriteFire?: Animation;

  onInitialize(_engine: Engine): void {
    this.name = "fireAttackW";
    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.FireringImage,
      grid: {
        rows: 1,
        columns: 3,
        spriteWidth: 324,
        spriteHeight: 324,
      },
    });
    this.spriteFire = new Animation({
      frames: [
        { graphic: spritesheet.getSprite(0, 0) as ex.Sprite, duration: 10 },
        { graphic: spritesheet.getSprite(1, 0) as ex.Sprite, duration: 20 },
        { graphic: spritesheet.getSprite(2, 0) as ex.Sprite, duration: 30 },
      ],
      scale: vec(0.1, 0.1),
    });

    this.graphics.add(this.spriteFire);
    this.actions
      .scaleTo(vec(5, 5), vec(1, 1))
      .toPromise()
      .then(() => {
        this.kill();
      });
  }

  onPreUpdate(_engine: Engine, _delta: number): void {}
}
