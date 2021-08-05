import { createNoiseGrid } from "../dist/index.js";

const grid = createNoiseGrid({
  width: 200,
  height: 200,
  resolution: 8,
  xInc: 0.01,
  yInc: 0.01,
  seed: Math.random() * 1000,
});

console.log(grid);
