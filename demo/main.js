import {
  random,
  createQtGrid,
  createVoronoiDiagram,
  create2DNoiseGrid,
  spline,
  createCoordsTransformer,
} from "../dist/index.js";

import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import { polygonCentroid } from "https://cdn.skypack.dev/d3-polygon";

console.clear();

const width = 200;
const height = 200;

const svg = SVG().viewbox(0, 0, width, height).addTo("body");

const transformCoords = createCoordsTransformer(svg.node);

console.log(random([1, 2, 3]));

const grid = createQtGrid({
  width: 100,
  height: 100,
  points: [],
});

console.log(grid);

const voronoi = createVoronoiDiagram({
  width: width,
  height: height,
  points: [...Array(100)].map(() => ({
    x: random(0, width),
    y: random(0, height),
  })),
  relaxIterations: 2,
});

console.log(voronoi);

const points = [];

let last = voronoi.cells[random(0, voronoi.cells.length, true)];
last.taken = true;
// points.push(last.centroid);

window.addEventListener("click", (e) => {
  const cell = getClosestObject(transformCoords(e), voronoi.cells);

  points.push(cell.points.filter((x) => x.constructor.name === "Array"));

  svg.polygon(cell.points).fill("#f9f9f9").scale(0.9);
});

window.addEventListener("keypress", () => {
  const allPoints = points.flat();

  const centroid = polygonCentroid(allPoints);

  const sorted = sortPointsByAngle(centroid, allPoints);

  const p = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    p.push();
  }

  svg.path(spline(sorted, 0, true));

  svg.circle(4).cx(centroid[0]).cy(centroid[1]);

  console.log(centroid);
});

function sortPointsByAngle(centroid, points) {
  const centerPoint = centroid;
  const sorted = points.slice(0);

  const sortByAngle = (p1, p2) => {
    return (
      (Math.atan2(p1[1] - centerPoint[1], p1[0] - centerPoint[0]) * 180) /
        Math.PI -
      (Math.atan2(p2[1] - centerPoint[1], p2[0] - centerPoint[0]) * 180) /
        Math.PI
    );
  };

  sorted.sort(sortByAngle);

  return sorted;
}

function getClosestObject(point, arr) {
  let obj = arr[0];
  let closest = pointDist(point, arr[0].centroid);

  for (let i = 1; i < arr.length; i++) {
    const dist = pointDist(point, arr[i].centroid);

    if (dist < closest) {
      obj = arr[i];
      closest = dist;
    }
  }

  return obj;
}

function pointDist(p1, p2) {
  if (p1.constructor.name === "Array") {
    p1 = {
      x: p1[0],
      y: p1[1],
    };
  }
  if (p2.constructor.name === "Array") {
    p2 = {
      x: p2[0],
      y: p2[1],
    };
  }
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

const noiseGrid = create2DNoiseGrid({
  width: 200,
  height: 100,
  cols: 19,
  rows: 19,
  yInc: 0.0375,
  xInc: 0.0375,
});

// noiseGrid.forEach((cell) => {
//   svg.rect(cell.width, cell.height).x(cell.x).y(cell.y).scale(0.9);
// });

console.log(noiseGrid);
