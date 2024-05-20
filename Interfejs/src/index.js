import * as PIXI from "pixi.js";
import { viewport, app } from "./Scene";
import { map } from "./map";

viewport.addChild(map);

const text = viewport.addChild(
  new PIXI.Text("Flatland 😀", {
    fontsize: 24,
    fill: 0xffffff,
    align: "center",
  })
);

function gameLoop() {
  // Update the current game state:
  // Update the objects
  if (map.refreshObjects.length)
  map.refreshObjects.forEach(obj => obj.update());
}

// Start the game loop after 1s
setTimeout(() => {
  app.ticker.add(gameLoop);
}, 1000);


text.resolution = 8;



