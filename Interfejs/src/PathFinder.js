import * as PIXI from "pixi.js";

class PathFinder {
  constructor(points, centralPoint) {
    this.points = points;
    this.centralPoint = centralPoint;
  }

  createPathBetweenPoints(point1, point2) {
    let path = [];
    let x = point1.x - point2.x;
    let y = point1.y - point2.y;
    let dx = x > 0 ? -1 : 1;
    let dy = y > 0 ? -1 : 1;
    for (let i = 0; i < Math.abs(x); i++) {
      path.push({ x: point1.x + i * dx, y: point1.y });
    }
    for (let i = 0; i < Math.abs(y); i++) {
      path.push({ x: point2.x, y: point1.y + i * dy });
    }
    return path;
  }

  findNearestPoint(point, listOfPoints) {
    let nearestPoint = listOfPoints[0];
    let nearestDistance = Math.sqrt(
      Math.pow(nearestPoint.x - point.x, 2) +
        Math.pow(nearestPoint.y - point.y, 2)
    );
    for (let i = 1; i < listOfPoints.length; i++) {
      const distance = Math.sqrt(
        Math.pow(listOfPoints[i].x - point.x, 2) +
          Math.pow(listOfPoints[i].y - point.y, 2)
      );
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestPoint = listOfPoints[i];
      }
    }
    return nearestPoint;
  }

  findPath() {
    let path = [this.centralPoint];
    let points = [...this.points];
    let neighbor;
    let actualPoint = this.centralPoint;
    let nearestPointInPath;
    for (let i = 0; i < 52; i++) {
      console.log("actualPoint", actualPoint);
      neighbor = this.findNearestPoint(actualPoint, points);
      points = points.filter((point) => point !== neighbor);

      nearestPointInPath = this.findNearestPoint(neighbor, path);

      path = path.concat(
        this.createPathBetweenPoints(nearestPointInPath, neighbor)
      );

      actualPoint = neighbor;
      console.log(points.length, path.length);
    }

    return path;
  }

  updatePoints(points) {
    this.points = points;
  }
}

export default PathFinder;
