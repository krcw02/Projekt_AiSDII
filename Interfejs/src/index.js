import * as PIXI from "pixi.js";
import { viewport } from "./Scene";
import { map } from "./map";

viewport.addChild(map);

const text = viewport.addChild(
  new PIXI.Text("Flatland 😀", {
    fontsize: 24,
    fill: 0xffffff,
    align: "center",
  })
);

text.resolution = 8;



