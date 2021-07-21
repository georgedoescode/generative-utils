import {
  random,
  createQtGrid,
  createVoronoiDiagram,
  create2DNoiseGrid,
} from "../dist/index.js";

import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";

console.clear();

const width = 200;
const height = 100;

const svg = SVG().viewbox(0, 0, width, height).addTo("body");

console.log(random([1, 2, 3]));

const grid = createQtGrid({
  width: 100,
  height: 100,
  points: [],
});

console.log(grid);

const voronoi = createVoronoiDiagram({
  width: 100,
  height: 100,
  points: [...Array(100)].map(() => ({ x: random(0, 100), y: random(0, 100) })),
  relaxIterations: 2,
});

console.log(voronoi);

const noiseGrid = create2DNoiseGrid({
  width: 200,
  height: 100,
  cols: 19,
  rows: 19,
  yInc: 0.0375,
  xInc: 0.0375,
});

noiseGrid.forEach((cell) => {
  svg.rect(cell.width, cell.height).x(cell.x).y(cell.y).scale(0.9);
});

console.log(noiseGrid);
