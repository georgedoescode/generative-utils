import {
  createNoiseGrid,
  createVoronoiTessellation,
  random,
} from "../dist/index.js";

const grid = createNoiseGrid({
  width: 200,
  height: 200,
  resolution: 8,
  xInc: 0.01,
  yInc: 0.01,
  seed: Math.random() * 1000,
});

console.log(grid);

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
