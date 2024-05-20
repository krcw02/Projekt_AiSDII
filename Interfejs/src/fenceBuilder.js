import * as PIXI from "pixi.js";
import { Villager, VillagerPair } from "./Villager";

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

  startBilding(fence, landmarks) {
    console.log("startBuilding");
    landmarks.pop();

    this.constructionPlan = new Map();
    this.landmarks = landmarks;

    let start = 0;
    for (let i = 0; i < landmarks.length; i++) {
      const landmark = landmarks[i];
      const nextLandmark = landmarks[i + 1];

      const end =
        nextLandmark !== undefined ? fence.indexOf(nextLandmark) : fence.length;

      this.constructionPlan.set(landmark, fence.slice(start, end));
      start = end;
    }

    this.constructionPlanWithNodes; // arr of obj: {node: Node, fencePart: blocks[] (PIXI obj)}

    landmarks.forEach((element) => {
      let node = this.findNeighbour(element);
      let fenceParts = this.constructionPlan.get(element);
      fenceParts.forEach((block) => {
        this.constructionPlanWithNodes.push({
          node: node,
          fencePart: this.map.blocks[block],
        });
      });
    });
    console.log(this.constructionPlanWithNodes);

    //set all villagerPairs to false
    this.villagerPairs.forEach((pair) => {
      pair.hired = false;
      pair.carries = false;
    });

    //send villager to build fence after 1 sec each
    // let i = 0;
    // let interval = setInterval(() => {
    //   if (i < this.constructionPlanWithNodes.length) {
         this.sendVillagerPair();
    //     i++;
    //   } else {
    //     clearInterval(interval);
    //   }
    // }, 2000);

    //after 1s
    setTimeout(() => {
        this.sendVillagerPair();

    }, 4000);
  }

  //metod to send new bilder villager from factory to fence and back
  sendVillagerPair() {
    if (
      this.villagerPairs.length === 0 ||
      this.constructionPlanWithNodes.length === 0
    ) {
      return;
    }
    console.log("sendVillager");

    // get first pair from array with is not hired
    let villagerPair = this.villagerPairs.find(
      (pair) => !pair.hired && !pair.carries
    );

    if (!villagerPair) {
      console.warn("Nie znaleziono dostępnej pary wieśniaków.");
      return;
    }

    villagerPair.hired = true;

    //find villager Pair in pathGraph

    // let villagerPairNode = this.findInPathGraph(
    //   villagerPair.pair.villager1.x + villagerPair.pair.villager1.y * 128
    // );

    //use path in villagerPair go to fence
    villagerPair.carries = true;
    villagerPair.actualPosition = this.constructionPlanWithNodes.shift();
    villagerPair.pair.moveInPath(
        villagerPair.actualPosition.node.path
    );

    villagerPair.pair.addEventListener("pathEnd", (obj) => {
      this.nextMove(villagerPair);
    });
  }

  nextMove(villagerPair) {
    console.log("nextMove");
    console.log(villagerPair);
    if (villagerPair.carries == true) {
      villagerPair.carries = false;
      villagerPair.pair.moveInPath(
        villagerPair.actualPosition.node.path.reverse()
      );
    }else if (villagerPair.carries == false) {
      villagerPair.hired = false;
      this.sendVillagerPair();
    }
  }

  addVillagerPair(villagerPair) {
    console.log("addVillagerPair");
    villagerPair.addEventListener("pathEnd", () => {});
    this.villagerPairs.push({
      pair: villagerPair,
      hired: false,
      carries: false,
      actualPosition: null
    });
  }
}
