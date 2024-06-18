import * as PIXI from "pixi.js";
import { porterTextures } from "./Textures";

export class Villager extends EventTarget {
  constructor(map, x, y, type = 0, id = -1) {
    super();
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.type = type;
    this.sprite = new PIXI.Sprite(porterTextures[type]);
    this.map = map;
    this.sprite.width = 64;
    this.sprite.height = 64;
    this.sprite.anchor.set(0.5);
    this.id = id;

    this.sprite.x = x * 64 + (this.type === 0 ? 10 : 54);
    this.sprite.y = y * 64;
    this.moving = false;
    this.path = [];
    this.speed = 1; // Adjusted speed for smooth movement
    map.addChild(this.sprite);
    this.refreshId = map.refreshObjects.push(this);
    this.callback = null;
  }

  move(targetX, targetY) {
    this.targetX = targetX;
    this.targetY = targetY;
    this.moving = true;
  }

  moveInPath(path, callback) {
    this.path = path.slice();
    if (callback) this.callback = callback;
    else this.callback = () => {};
  }

  update() {
    if (this.moving) {
      let targetSpriteX = this.targetX * 64 + (this.type === 0 ? 10 : 54);
      let targetSpriteY = this.targetY * 64;
      let dx = targetSpriteX - this.sprite.x;
      let dy = targetSpriteY - this.sprite.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.speed) {
        this.sprite.x = targetSpriteX;
        this.sprite.y = targetSpriteY;
        this.x = this.targetX;
        this.y = this.targetY;
        this.moving = false;
      } else {
        this.sprite.x += (dx / distance) * this.speed;
        this.sprite.y += (dy / distance) * this.speed;
      }
    } else if (this.path.length) {
      const next = this.path.shift();
      this.move(next[0], next[1]);
      if (!this.path.length) {
        this.dispatchEvent(new CustomEvent("pathEnd", { obj: this }));
        this.callback();
      }
    }
  }

  remove() {
    this.map.removeChild(this.sprite);
  }
}

export class VillagerPair extends EventTarget {
  constructor(
    map,
    x1,
    y1,
    x2,
    y2,
    offsetX = 64,
    type1 = 0,
    type2 = 1,
    id1 = -1,
    id2 = -1
  ) {
    super();
    this.villager1 = new Villager(map, x1, y1, type1, id1);
    this.villager2 = new Villager(map, x2, y2, type2, id2);
    this.offsetX = offsetX; // Offset in pixels

    this.path = [];
    this.refreshId = null;
    this.callback = null;
    map.refreshObjects.push(this);
  }

  move(targetX, targetY) {
    this.villager1.move(targetX, targetY);
    this.villager2.move(targetX, targetY);
  }

  moveInPath(path, callback) {
    this.path = path.slice();
    if (callback) this.callback = callback;
    else this.callback = () => {};
  }

  update() {
    if (!this.villager1.moving && !this.villager2.moving && this.path.length) {
      const next = this.path.shift();
      this.villager1.move(next[0], next[1]);
      this.villager2.move(next[0], next[1]);
      if (!this.path.length) {
        // emit event when the path is finished

        setTimeout(() => {
          this.callback();
          this.dispatchEvent(new CustomEvent("pathEnd", { obj: this }));
        }, 300);
      }
    }
  }

  remove() {
    this.villager1.remove();
    this.villager2.remove();
  }
}
