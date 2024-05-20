import * as PIXI from "pixi.js";
import grass from "./assets/grass.png";
import pathTexture from "./assets/path.png";
import poinTexture from "./assets/point.png";
import { pathTextures, factoryTextures, fenceTexture } from "./Textures";
import { createGraph } from "./graf";
import { createFenceBetweenLandmarks } from "./fence";
import { Villager, VillagerPair } from "./Villager";
import { FenceBuilder } from "./fenceBuilder";

// import {VillagerGroup} from "./VillagerGroup"; // TDDO: do usunięcia

function refreshBlock(x, y) {
  const block = map.blocks[y * width + x];
  let texture = 0;
  const left = map.blocks[y * width + x - 1];
  const right = map.blocks[y * width + x + 1];
  const top = map.blocks[(y - 1) * width + x];
  const bottom = map.blocks[(y + 1) * width + x];

  if (block.permutation != -1) {
    if (left.id == block.id) {
      texture += 1;
    }
    if (right.id == block.id) {
      texture += 4;
    }
    if (top.id == block.id) {
      texture += 8;
    }
    if (bottom.id == block.id) {
      texture += 2;
    }
    block.texture = pathTextures[texture];
    block.permutation = texture;
  }
}

function setFactory(block, x, y) {
  // if factory is already set remove it
  if (factoryPosition) {
    const b0 = map.blocks[factoryPosition[1] * width + factoryPosition[0]];
    const b1 = map.blocks[factoryPosition[1] * width + factoryPosition[0] + 1];
    const b2 =
      map.blocks[(factoryPosition[1] + 1) * width + factoryPosition[0]];
    const b3 =
      map.blocks[(factoryPosition[1] + 1) * width + factoryPosition[0] + 1];

    b0.texture = map.textures[0];
    b1.texture = map.textures[0];
    b2.texture = map.textures[0];
    b3.texture = map.textures[0];

    b0.id = 0;
    b1.id = 0;
    b2.id = 0;
    b3.id = 0;

    b0.permutation = -1;
    b1.permutation = -1;
    b2.permutation = -1;
    b3.permutation = -1;

    factoryPosition = null;
  }

  //tekstura fabryki jest wieksza niz 1x1 ma 2x2
  // czyli trzeba zmienic 4 bloki po kliknieciu zmieniamy x,y i x+1,y i x,y+1 i x+1,y+1
  const block1 = map.blocks[y * width + x + 1];
  const block2 = map.blocks[(y + 1) * width + x];
  const block3 = map.blocks[(y + 1) * width + x + 1];

  block.texture = factoryTextures[0];
  block1.texture = factoryTextures[1];
  block2.texture = factoryTextures[2];
  block3.texture = factoryTextures[3];

  block.id = 3;
  block1.id = 3;
  block2.id = 3;
  block3.id = 3;

  block.permutation = 0;
  block1.permutation = 1;
  block2.permutation = 2;
  block3.permutation = 3;

  //set factory position
  factoryPosition = [x, y];
  return;
}

function changeTexture(x, y, texture) {
  const block = map.blocks[y * width + x];
  if (texture == 3) {
    setFactory(block, x, y);
    return;
  }
  block.texture = map.textures[texture];
  block.id = texture;
  block.permutation = texture == 1 ? 0 : -1;
  refreshBlock(x, y);
  refreshBlock(x, y + 1);
  refreshBlock(x, y - 1);
  refreshBlock(x + 1, y);
  refreshBlock(x - 1, y);
}

function toggleMapEvent(state) {
  if (!map.buttonMode && state) {
    console.log(map.buttonMode);
    map.on("click", (event) => {
      // Pobranie lokalnej pozycji myszy względem kontenera mapy
      const position = event.getLocalPosition(map);
      const x = Math.floor(position.x / map.blockSize);
      const y = Math.floor(position.y / map.blockSize);
      const index = y * width + x;
      if (index >= 0 && index < map.blocks.length) {
        console.log(`Kliknięto blok na pozycji X: ${x}, Y: ${y}`);
        changeTexture(x, y, map.actualTexture);
      }
    });
  } else if (map.buttonMode && !state) {
    map.off("click");
  }
  map.buttonMode = state;
}

function toggleButtonClass() {
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.classList.remove("activeButton");
  });
}

const map = new PIXI.Container();
map.sortableChildren = true;
width = 128;
height = 128;
map.blockSize = 64;
map.blocks = [];
map.textures = [
  PIXI.Texture.from(grass),
  PIXI.Texture.from(pathTexture),
  PIXI.Texture.from(poinTexture),
];
map.interactive = true; // Mapa jest interaktywna
map.buttonMode = false; // Ustawiamy kursor jako wskaźnik
map.actualTexture = 1;
map.refreshObjects = [];
factoryPosition = null;
for (let y = 0; y < width; y++) {
  for (let x = 0; x < height; x++) {
    const block = new PIXI.Sprite(map.textures[0]);
    block.x = x * map.blockSize;
    block.y = y * map.blockSize;
    block.width = map.blockSize;
    block.height = map.blockSize;
    block.id = 0;
    block.permutation = -1;
    map.addChild(block);
    map.blocks.push(block);
  }
}

let pathGraph = null;
let fenceBuilder = null;

document.querySelector("#button1").addEventListener("click", () => {
  map.actualTexture = 0; // Zmiana aktualnej tekstury na trawę
  toggleMapEvent(true);
  toggleButtonClass();
  document.querySelector("#button1").classList.add("activeButton");
});
document.querySelector("#button2").addEventListener("click", () => {
  map.actualTexture = 1; // Zmiana aktualnej tekstury na ścieżkę
  toggleMapEvent(true);
  toggleButtonClass();
  document.querySelector("#button2").classList.add("activeButton");
});
document.querySelector("#button3").addEventListener("click", () => {
  toggleMapEvent(false);
  toggleButtonClass();
  document.querySelector("#button3").classList.add("activeButton");
});
document.querySelector("#button4").addEventListener("click", () => {
  map.actualTexture = 2; // Zmiana aktualnej tekstury na punkt
  toggleMapEvent(true);
  toggleButtonClass();
  document.querySelector("#button4").classList.add("activeButton");
});
document.querySelector("#button5").addEventListener("click", () => {
  map.actualTexture = 3; // Zmiana aktualnej tekstury na fabrykę
  toggleMapEvent(true);
  //set activeButton class for button
  toggleButtonClass();
  document.querySelector("#button5").classList.add("activeButton");
});
document.querySelector("#button6").addEventListener("click", () => {
  // generowanie grafu

  //remove all text from map

  if (factoryPosition) {
    pathGraph = createGraph(map, [factoryPosition[0] - 1, factoryPosition[1]]);
    // numerate blocks in path with smal numbers in left top corner of block x, y in 8px white font
    let i = 0;
    pathGraph.forEach((block) => {
      const text = new PIXI.Text(pathGraph[i].path.length, {
        fontSize: 30,
        fill: 0xffffff,
      });
      text.x = block.vertex[0] * map.blockSize + 10;
      text.y = block.vertex[1] * map.blockSize + 10;
      map.addChild(text);

      i++;
    });

    // remove after 5 sec TODO: remove this fragment after testing
    // setTimeout(() => {
    //   let i = 0;
    //   pathGraph.forEach((block) => {
    //     map.removeChild(map.children[map.children.length - 1]);
    //     i++;
    //   });
    // }, 1000);

    //create fence between landmarks use id=4 and fence texture but create animation of building fence 1 block per 0.5 sec
    let {fence, landmarks} = createFenceBetweenLandmarks(pathGraph, map);
    let fenceBuilder = new FenceBuilder(map, pathGraph, factoryPosition[0], factoryPosition[1]);
    //add villager to fenceBuilder
    fenceBuilder.addVillagerPair(new VillagerPair(map, factoryPosition[0], factoryPosition[1], factoryPosition[0], factoryPosition[1], 64, 0, 1));
    fenceBuilder.addVillagerPair(new VillagerPair(map, factoryPosition[0], factoryPosition[1], factoryPosition[0], factoryPosition[1], 64, 0, 1));
    fenceBuilder.startBilding(fence, landmarks);
    // i = 0;
    // let interval = setInterval(() => {
    //   if (i < fence.length) {
    //     const block = map.blocks[fence[i]];
    //     block.texture = fenceTexture;
    //     block.id = 4;
    //     block.permutation = 0;
    //     i++;
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 500);
  }
});

document.querySelector("#button7").addEventListener("click", () => {
  // generate villager

  if (pathGraph) {
    //set villager on factory position
    const villagerPair = new VillagerPair(
      map,
      factoryPosition[0],
      factoryPosition[1],
      factoryPosition[0],
      factoryPosition[1],
      64,
      0,
      1
    );

    //go to last path in pathGraph
    let p = pathGraph.pop();
    console.log(p);
    villagerPair.moveInPath(p.path);
    villagerPair.addEventListener("pathEnd", () => {
      console.log("pathEnd");
    });

  }

});

export { map };
