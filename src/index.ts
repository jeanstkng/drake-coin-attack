import { Color, Engine, Physics } from "excalibur";
import { DevTool } from "@excaliburjs/dev-tools";
import { Resources, loader } from "./loader";
import { drake } from "./gameObjects/drake";
import { enemySpawner } from "./gameObjects/enemySpawner";

Physics.useArcadePhysics();

const game = new Engine({
  backgroundColor: Color.Chartreuse,
  height: 600,
  width: 800,
});
const devtool = new DevTool(game);

game.start(loader).then(() => {
  Resources.TiledMap.addToScene(game.currentScene);
});

game.add(drake);
game.currentScene.camera.strategy.lockToActor(drake);

game.add(enemySpawner);
