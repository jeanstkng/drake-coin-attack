import {
  ImageFiltering,
  ImageSource,
  Loadable,
  Loader,
  Resource,
} from "excalibur";
import { TiledResource } from "@excaliburjs/plugin-tiled";

import tmxPath from "../src/images/drakemap.tmx?url";
import tsxPath from "../src/images/Water.tsx?url";
import tsxTwoPath from "../src/images/Tilemap_Flat.tsx?url";

import tilesetPath1 from "F:/Tiny Swords (Update 010)/Terrain/Water/Rocks/Rocks_04.png?url";
import tilesetPath2 from "F:/Tiny Swords (Update 010)/Terrain/Water/Foam/Foam.png?url";
import tilesetPath3 from "F:/Tiny Swords (Update 010)/Resources/Trees/Tree.png?url";
import tilesetPath4 from "F:/Tiny Swords (Update 010)/Terrain/Bridge/Bridge_All.png?url";
import tilesetPath5 from "F:/Tiny Swords (Update 010)/Terrain/Ground/Tilemap_Elevation.png?url";
import tilesetPath6 from "F:/Tiny Swords (Update 010)/Terrain/Ground/Tilemap_Flat.png?url";
import tilesetPath7 from "F:/Tiny Swords (Update 010)/Terrain/Water/Water.png?url";

export const Resources = {
  Explosion1: new ImageSource("./Explosion/1.png", false, ImageFiltering.Pixel),
  Explosion2: new ImageSource("./Explosion/2.png", false, ImageFiltering.Pixel),
  Explosion3: new ImageSource("./Explosion/3.png", false, ImageFiltering.Pixel),
  Explosion4: new ImageSource("./Explosion/4.png", false, ImageFiltering.Pixel),
  Explosion5: new ImageSource("./Explosion/5.png", false, ImageFiltering.Pixel),
  Explosion6: new ImageSource("./Explosion/6.png", false, ImageFiltering.Pixel),
  Explosion7: new ImageSource("./Explosion/7.png", false, ImageFiltering.Pixel),
  Explosion8: new ImageSource("./Explosion/8.png", false, ImageFiltering.Pixel),
  Explosion9: new ImageSource("./Explosion/9.png", false, ImageFiltering.Pixel),
  Explosion10: new ImageSource(
    "./Explosion/10.png",
    false,
    ImageFiltering.Pixel
  ),
  Explosion11: new ImageSource(
    "./Explosion/11.png",
    false,
    ImageFiltering.Pixel
  ),
  Explosion12: new ImageSource(
    "./Explosion/12.png",
    false,
    ImageFiltering.Pixel
  ),
  DrakeImage: new ImageSource("./drake.png", false, ImageFiltering.Pixel),
  GoButtonImage: new ImageSource("./goBtn.png", false, ImageFiltering.Pixel),
  FruitsSpriteSheet: new ImageSource(
    "./Fruits.png",
    false,
    ImageFiltering.Pixel
  ),
  WarriorYellowSpriteSheet: new ImageSource(
    "./Warrior_Yellow.png",
    false,
    ImageFiltering.Pixel
  ),
  FireBasicImage: new ImageSource("./Fire.png", false, ImageFiltering.Pixel),
  FireboltImage: new ImageSource("./Firebolt.png", false, ImageFiltering.Pixel),
  FireringImage: new ImageSource("./Firering.png", false, ImageFiltering.Pixel),
  QButtonImage: new ImageSource("./QButton.png", false, ImageFiltering.Pixel),
  WButtonImage: new ImageSource("./WButton.png", false, ImageFiltering.Pixel),
  TiledMap: new TiledResource(tmxPath, {
    useTilemapCameraStrategy: true,
    pathMap: [
      { path: "drakemap.tmx", output: tmxPath },
      { path: "Water.tsx", output: tsxPath },
      { path: "Tilemap_Flat.tsx", output: tsxTwoPath },
      { path: "Rocks_04.png", output: tilesetPath1 },
      { path: "Foam.png", output: tilesetPath2 },
      { path: "Tree.png", output: tilesetPath3 },
      { path: "Bridge_All.png", output: tilesetPath4 },
      { path: "Tilemap_Elevation.png", output: tilesetPath5 },
      { path: "Tilemap_Flat.png", output: tilesetPath6 },
      { path: "Water.png", output: tilesetPath7 },
    ],
  }),
  TsxResource: new Resource(tsxPath, "text"),
  TsxTwoResource: new Resource(tsxTwoPath, "text"),
} as any;

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res as Loadable<any>);
}
