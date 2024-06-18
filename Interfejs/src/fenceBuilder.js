import * as PIXI from "pixi.js";
import { Villager, VillagerPair } from "./Villager";
import { pathTextures, factoryTextures, fenceTexture } from "./Textures";

function tCoord(x, y) {
  const width = 128;
  return y * width + x;
}

export class FenceBuilder {
  constructor(map, pathGraph, factoryX, factoryY) {
    this.map = map;
    this.factoryX = factoryX;
    this.factoryY = factoryY;
    this.pathGraph = pathGraph;
    this.fence = [];
    this.villagerPairs = [];
    this.constructionPlan = null;
    this.constructionPlanWithNodes = [];
    this.landmarks = null;
  }

  findNeighbour(element) {
    let x = element % 128;
    let y = Math.floor(element / 128);

    for (let node of this.pathGraph) {
      if (node.vertex[0] === x + 1 && node.vertex[1] === y) {
        return node;
      } else if (node.vertex[0] === x - 1 && node.vertex[1] === y) {
        return node;
      } else if (node.vertex[0] === x && node.vertex[1] === y + 1) {
        return node;
      } else if (node.vertex[0] === x && node.vertex[1] === y - 1) {
        return node;
      }
    }
    console.warn("Nie znaleziono sąsiada");
    return null;
  }

  findInPathGraph(element) {
    let x = element % 128;
    let y = Math.floor(element / 128);

    for (let node of this.pathGraph) {
      if (node.vertex[0] === x && node.vertex[1] === y) {
        return node;
      }
    }
    //if not found check in findNeighbour
    return this.findNeighbour(element);
  }

  getNameOfStatus(pair) {
    if (pair.hired && pair.carries) return "Niesie";
    if (pair.hired) return "Wraca";
    return "Oczekuje";
  }
  createWorkSheets() {
    let workSheet = "";
    let i = 0;
    this.villagerPairs.forEach((p) => {
      workSheet += `<div class=ws${i++}> Para ${i} (${this.getNameOfStatus(
        p
      )})</div>`;
    });
    document.querySelector("#workSheet").innerHTML = workSheet;
  }

  startBilding(fence, landmarks) {
    this.createWorkSheets();

    landmarks.pop();

    this.constructionPlan = new Map();
    this.landmarks = landmarks;
    console.log(fence, landmarks);
    let start = 0;
    for (let i = 0; i < landmarks.length; i++) {
      const landmark = landmarks[i];
      const nextLandmark = landmarks[i + 1];

      const end =
        nextLandmark !== undefined ? fence.indexOf(nextLandmark) : fence.length;

      this.constructionPlan.set(landmark, fence.slice(start, end));
      start = end;
    }

    const res = new Set();
    console.log(this.constructionPlan);

    landmarks.forEach((element) => {
      let node = this.findNeighbour(element);
      res.add(node);
      let fenceParts = this.constructionPlan.get(element);
      fenceParts.forEach((block) => {
        this.constructionPlanWithNodes.push({
          node: node,
          fencePart: this.map.blocks[block],
        });
      });
    });

    //set all villagerPairs to false
    this.villagerPairs.forEach((pair) => {
      pair.hired = false;
      pair.carries = false;
    });

    //send villager to build fence after 1 sec each
    let interval = setInterval(() => {
      if (this.constructionPlanWithNodes.length !== 0) {
        this.sendVillagerPair();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return res;
  }

  //metod to send new bilder villager from factory to fence and back
  sendVillagerPair() {
    if (
      this.villagerPairs.length === 0 ||
      this.constructionPlanWithNodes.length === 0
    ) {
      return;
    }

    // get first pair from array with is not hired
    let villagerPair = this.villagerPairs.find(
      (pair) => !pair.hired && !pair.carries
    );

    if (!villagerPair) {
      // console.warn("Nie znaleziono dostępnej pary robotnikow.");
      return;
    }

    villagerPair.hired = true;

    //use path in villagerPair go to fence
    villagerPair.actualPosition = this.constructionPlanWithNodes.shift();

    villagerPair.carries = true;

    //set wayBack as copy of actualPosition and reverse it with slice
    villagerPair.wayBack = villagerPair.actualPosition.node.path
      .slice()
      .reverse();

    villagerPair.pair.moveInPath(villagerPair.actualPosition.node.path, () => {
      this.buildFence(villagerPair);
      setTimeout(() => {
        this.returnToFacotry(villagerPair);
      }, 500);
    });
  }

  returnToFacotry(villagerPair) {
    villagerPair.carries = false;
    villagerPair.pair.moveInPath(villagerPair.wayBack, () => {
      villagerPair.hired = false;
    });
    villagerPair.pair.removeEventListener("pathEnd", () => {});
  }

  //metod to build fence by villager when willager is in right place
  buildFence(villagerPair) {
    let fencePart = villagerPair.actualPosition.fencePart;
    fencePart.texture = fenceTexture;
  }

  addVillagerPair(villagerPair) {
    villagerPair.addEventListener("pathEnd", () => {
      this.createWorkSheets();
    });
    this.villagerPairs.push({
      pair: villagerPair,
      hired: false,
      carries: false,
      actualPosition: null,
      wayBack: null,
    });
  }
}
