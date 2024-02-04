import {
  Engine,
  GraphicsGroup,
  ScreenElement,
  Sprite,
  SpriteSheet,
  vec,
  Random,
} from "excalibur";
import { Resources } from "../loader";
import { drake } from "./drake";

export class SlotMachine extends ScreenElement {
  private fruitA!: Sprite;
  private fruitB!: Sprite;
  private fruitC!: Sprite;
  private fruits: Sprite[] = [];
  private actualBet: number = 10;

  constructor() {
    super({
      x: 50,
      y: 500,
      z: 20,
    });
  }

  onInitialize(engine: Engine): void {
    const spriteSheet = SpriteSheet.fromImageSource({
      image: Resources.FruitsSpriteSheet,
      grid: {
        rows: 6,
        columns: 38,
        spriteWidth: 16,
        spriteHeight: 16,
      },
    });

    this.fruitA = spriteSheet.getSprite(0, 0) as Sprite;
    this.fruitB = spriteSheet.getSprite(1, 0) as Sprite;
    this.fruitC = spriteSheet.getSprite(2, 0) as Sprite;

    this.fruitA.scale = vec(2.5, 2.5);
    this.fruitB.scale = vec(2.5, 2.5);
    this.fruitC.scale = vec(2.5, 2.5);

    this.fruits = [this.fruitA, this.fruitB, this.fruitC];

    const group = new GraphicsGroup({
      members: [
        { graphic: this.fruitA, pos: vec(50, 0) },
        { graphic: this.fruitB, pos: vec(100, 0) },
        { graphic: this.fruitC, pos: vec(150, 0) },
      ],
    });

    this.graphics.use(group);

    document.getElementById("gambleMore")?.addEventListener("pointerup", () => {
      this.actualBet += 5;
      const drakeCoins = drake.getCoins();
      if (this.actualBet > drakeCoins) {
        this.actualBet = drakeCoins;
      }
      document.getElementById("actualBet")!.innerText = `${this.actualBet}`;
    });

    document.getElementById("gambleLess")?.addEventListener("pointerup", () => {
      this.actualBet -= 5;
      if (this.actualBet <= 0) {
        this.actualBet = 1;
      }
      document.getElementById("actualBet")!.innerText = `${this.actualBet}`;
    });
  }

  public shuffleGraphicGroup() {
    drake.reduceCoins(this.actualBet);
    const rand = new Random();
    const generatedRandom = rand.range(3, 0, this.fruits.length - 1);

    if (generatedRandom.every((val) => val === 0)) {
      drake.incrementCoins(this.actualBet * 2);
    } else if (generatedRandom.every((val) => val === 1)) {
      drake.incrementCoins(this.actualBet * 4);
    } else if (generatedRandom.every((val) => val === 2)) {
      drake.incrementCoins(this.actualBet * 10);
    }

    const newGroup = new GraphicsGroup({
      members: [
        {
          graphic: this.fruits[generatedRandom[0]],
          pos: vec(50, 0),
        },
        {
          graphic: this.fruits[generatedRandom[1]],
          pos: vec(100, 0),
        },
        {
          graphic: this.fruits[generatedRandom[2]],
          pos: vec(150, 0),
        },
      ],
    });
    this.graphics.use(newGroup);
  }
}
const slotMachine = new SlotMachine();

const goButton = new ScreenElement({
  x: 250,
  y: 500,
  z: 20,
});

const goBtnSprite = Resources.GoButtonImage.toSprite();
goBtnSprite.scale = vec(0.75, 0.75);

goButton.graphics.add(goBtnSprite);

goButton.on("pointerup", () => {
  slotMachine.shuffleGraphicGroup();
});

export { slotMachine, goButton };
