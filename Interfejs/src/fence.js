import * as PIXI from "pixi.js";
import { convexHull } from "./Graham";

function tCoord(x, y) {
  const width = 128;
  return y * width + x;
}
export function useConvexHull(landmarks) {
  //prepere data for convexHull
  let points = [];
  for (let i = 0; i < landmarks.length; i++) {
    let x = landmarks[i] % 128;
    let y = Math.floor(landmarks[i] / 128);
    points.push([x, y]);
  }
  //get convexHull
  let convexHullPoints = convexHull(points);
  //convert to tCoord
  let convexHullTCoord = [];
  for (let i = 0; i < convexHullPoints.length; i++) {
    convexHullTCoord.push(
      tCoord(convexHullPoints[i][0], convexHullPoints[i][1])
    );
  }
  // add first point to close the fence
  convexHullTCoord.push(convexHullTCoord[0]);
  return convexHullTCoord;
}

function findLandmarkInMap(pathGraph, map) {
  const idLandmark = 2;
  let landmarks = [];
  console.log(map.blocks);
  for (let i = 0; i < pathGraph.length; i++) {
    let x = pathGraph[i].vertex[0];
    let y = pathGraph[i].vertex[1];

    if (map.blocks[tCoord(x + 1, y)].id == idLandmark) {
      landmarks.push(tCoord(x + 1, y));
    }
    if (map.blocks[tCoord(x - 1, y)].id == idLandmark) {
      landmarks.push(tCoord(x - 1, y));
    }
    if (map.blocks[tCoord(x, y + 1)].id == idLandmark) {
      landmarks.push(tCoord(x, y + 1));
    }
    if (map.blocks[tCoord(x, y - 1)].id == idLandmark) {
      landmarks.push(tCoord(x, y - 1));
    }
  }
  console.log("Landmarks: ", landmarks);
  return landmarks;
}

export function createFenceBetweenLandmarks(pathGraph, map) {
  let landmarks = useConvexHull(findLandmarkInMap(pathGraph, map));

  let fence = [];
  for (let i = 0; i < landmarks.length - 1; i++) {
    let x0 = landmarks[i] % 128;
    let y0 = Math.floor(landmarks[i] / 128);
    let x1 = landmarks[i + 1] % 128;
    let y1 = Math.floor(landmarks[i + 1] / 128);
    let dx = Math.abs(x1 - x0);
    let dy = Math.abs(y1 - y0);
    let sx = x0 < x1 ? 1 : -1;
    let sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    while (true) {
      fence.push(tCoord(x0, y0));
      if (x0 == x1 && y0 == y1) break;
      let e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x0 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

  return { fence, landmarks }; 
}
