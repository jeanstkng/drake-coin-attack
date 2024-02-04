import { Color, Engine, Physics, Scene } from "excalibur";
import { DevTool } from "@excaliburjs/dev-tools";
import { Resources, loader } from "./loader";
import { drake } from "./gameObjects/drake";
import { enemySpawner } from "./gameObjects/enemySpawner";
import { goButton, slotMachine } from "./gameObjects/slotMachine";

Physics.useArcadePhysics();
Physics.checkForFastBodies = true;

const game = new Engine({
  backgroundColor: Color.Chartreuse,
  height: 600,
  width: 800,
  canvasElementId: "game",
  fixedUpdateFps: 30,
});

new DevTool(game);

const level = new Scene();

level.add(drake);
level.camera.strategy.lockToActor(drake);

level.add(enemySpawner);
level.add(slotMachine);
level.add(goButton);

game.add("level", level);

game.start(loader).then(() => {
  document.getElementById("ui")!.style.visibility = "visible";
  game.goToScene("level");
  Resources.TiledMap.addToScene(level);
});
