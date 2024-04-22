import * as PIXI from "pixi.js";
import grass from "./assets/grass.png";
import pathTexture from "./assets/path.png";
import PathFinder from "./PathFinder";

const map = new PIXI.Container();
map.sortableChildren = true;
width = 128;
height = 128;
map.blockSize = 16;
map.blocks = [];
map.textures = [PIXI.Texture.from(grass), PIXI.Texture.from(pathTexture)];

for (let y = 0; y < width; y++) {
  for (let x = 0; x < height; x++) {
    const block = new PIXI.Sprite(map.textures[0]);
    block.x = x * map.blockSize;
    block.y = y * map.blockSize;
    block.width = map.blockSize;
    block.height = map.blockSize;
    map.addChild(block);
    map.blocks.push(block);
  }
}

//  crate a 8 random points on the map 128x128 regularly
const length = 50;
const points = [];
{
  // TODO: Poprawic losowanie punktow(czasem sa zbyt blisko siebie)
  // TODO: Zrobic marginesy na brzegach mapy
  let x = 64;
  let y = 64;
  for (let i = 0; i < length / 4; i++) {
    points.push({
      x: Math.floor(Math.random() * x),
      y: Math.floor(Math.random() * y),
    });
  }
  for (let i = 0; i < length / 4; i++) {
    points.push({
      x: Math.floor(Math.random() * x),
      y: Math.floor(Math.random() * y) + 64,
    });
  }
  for (let i = 0; i < length / 4; i++) {
    points.push({
      x: Math.floor(Math.random() * x) + 64,
      y: Math.floor(Math.random() * y),
    });
  }
  for (let i = 0; i < length / 4; i++) {
    points.push({
      x: Math.floor(Math.random() * x) + 64,
      y: Math.floor(Math.random() * y) + 64,
    });
  }
}

const pathFinder = new PathFinder(points, { x: 64, y: 64 });
const path = pathFinder.findPath();

for (let i = 0; i < path.length; i++) {
  let north = false; //   N
  let south = false; // W   E
  let east = false; //    S
  let west = false;

  if(path[i].y+1)

  const block = map.blocks[path[i].y * width + path[i].x];
  block.texture = map.textures[1];
}

// create loop with time interval to change the path
// let i = 0;
// setInterval(() => {
//   if (i < path.length) {
//     const block = map.blocks[path[i].y * width + path[i].x];
//     block.texture = map.textures[1];
//     i++;
//   }
// }, 10);

export { map };
