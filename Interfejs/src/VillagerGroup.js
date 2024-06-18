import * as PIXI from "pixi.js";
import { porterTextures } from "./Textures";
import { Villager } from "./Villager";

export class VillagerGroup {
  constructor(map) {
    this.map = map;
    this.villagers = [];
  }

  addVillager(x, y, type = 0) {
    const villager = new Villager(this.map, x, y, type);
    this.villagers.push(villager);
    return villager;
  }

  move(targetX, targetY) {
    this.villagers.forEach((villager, index) => {
      // Calculate offset to keep villagers together
      const offsetX = 45;
      const offsetY = Math.floor(index / 2);
      villager.move(targetX + offsetX, targetY + offsetY);
    });
  }

  update() {
    this.villagers.forEach(villager => villager.update());
  }

  remove() {
    this.villagers.forEach(villager => villager.remove());
  }
}
