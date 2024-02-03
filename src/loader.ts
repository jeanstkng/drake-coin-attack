import { ImageFiltering, ImageSource, Loader, Resource } from "excalibur";
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
  DrakeImage: new ImageSource(
    "./src/images/drake.png",
    false,
    ImageFiltering.Pixel
  ),
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
} as const;

export const loader = new Loader();

for (let res of Object.values(Resources)) {
  loader.addResource(res);
}
