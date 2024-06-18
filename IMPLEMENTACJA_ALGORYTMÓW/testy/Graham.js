// Graham.js

export class Graham {
  constructor() {
    this.pivot = null;
  }

  orientation(p, q, r) {
    const val = (q[1] - p[1]) * (r[0] - q[0]) - (q[0] - p[0]) * (r[1] - q[1]);
    if (val == 0) {
      return 0;
    }
    return val > 0 ? 1 : 2;
  }

  compare(p, q) {
    const diff = this.orientation(this.pivot, p, q);
    if (diff === 0) {
      return this.distanceSquared(this.pivot, q) >=
        this.distanceSquared(this.pivot, p)
        ? -1
        : 1;
    }
    return diff === 2 ? -1 : 1;
  }

  distanceSquared(p1, p2) {
    return Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
  }

  convexHull(points) {
    let minY = Infinity;
    let minIndex = -1;
    for (let i = 0; i < points.length; i++) {
      const y = points[i][1];
      if (y < minY || (y === minY && points[i][0] < points[minIndex][0])) {
        minY = y;
        minIndex = i;
      }
    }
    this.pivot = points[minIndex];
    points.sort(this.compare.bind(this));
    const stack = [points[0], points[1]];
    for (let i = 2; i < points.length; i++) {
      while (
        stack.length > 1 &&
        this.orientation(
          stack[stack.length - 2],
          stack[stack.length - 1],
          points[i]
        ) != 2
      ) {
        stack.pop();
      }
      stack.push(points[i]);
    }
    return stack;
  }
}
