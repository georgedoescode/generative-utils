import { random, createQtGrid } from "../dist/index.js";

console.log(random([1, 2, 3]));

const grid = createQtGrid({
  width: 100,
  height: 100,
  points: [],
});

console.log(grid);
