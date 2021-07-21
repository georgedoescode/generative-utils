import {
  random,
  createQtGrid,
  createVoronoiDiagram,
  create2DNoiseGrid,
} from "../dist/index.js";

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
  width: 100,
  height: 100,
  cols: 10,
  rows: 10,
});

console.log(noiseGrid);
