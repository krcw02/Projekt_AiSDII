import * as PIXI from "pixi.js";
import { Viewport } from "pixi-viewport";

export const app = new PIXI.Application({
  view: document.querySelector("canvas"),
  width: window.innerWidth,
  height: window.innerHeight,
  antialias: true,
  autoDensity: true,
  backgroundColor: 0x0,
  resolution: devicePixelRatio
});

export const viewport = new Viewport({
  worldWidth: 10000,
  worldHeight: 10000,
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  events: app.renderer.events
})
  .drag()
  .pinch({ percent: 2 })
  .wheel()
  .decelerate();

app.stage.addChild(viewport);
app.ticker.start();

const onResize = () => {
  app.renderer.resize(window.innerWidth, window.innerHeight);
  viewport.resize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onResize);
