import {
  createNoiseGrid,
  createVoronoiTessellation,
  random,
  map,
} from "../dist/index.js";
import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";

const svg = SVG().viewbox(0, 0, 200, 200).addTo("body");

const grid = createNoiseGrid({
  width: 200,
  height: 200,
  resolution: 32,
  xInc: 0.01,
  yInc: 0.01,
  seed: Math.random() * 1000,
});

grid.cells.forEach((cell) => {
  svg
    .rect(cell.width, cell.height)
    .x(cell.x)
    .y(cell.y)
    .opacity(map(cell.noiseValue, -1, 1, 0, 1));
});

console.log(
  grid.lookup({
    x: 1000,
    y: 1000,
  })
);

const points = [...Array(40)].map(() => ({
  x: random(0, 100),
  y: random(0, 100),
}));

console.log(points);

const t = createVoronoiTessellation({
  width: 100,
  height: 100,
  relaxIterations: 0,
  points,
});

console.log(t);
