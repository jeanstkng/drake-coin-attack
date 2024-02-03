import { Color, Engine } from "excalibur";
import { Resources, loader } from "./loader";
import { drake } from "./gameObjects/drake";

const game = new Engine({
  backgroundColor: Color.Chartreuse,
  height: 600,
  width: 800,
});

game.start(loader).then(() => {
  Resources.TiledMap.addToScene(game.currentScene);
});

game.add(drake);
game.currentScene.camera.strategy.lockToActor(drake);
