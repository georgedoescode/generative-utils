import { SVG } from "https://cdn.skypack.dev/@svgdotjs/svg.js";
import { createVoronoiDiagram } from "../dist/index.js";
import { random } from "../src/random.js";

const svg = SVG().viewbox(0, 0, 200, 200).addTo("body");

const { cells } = createVoronoiDiagram({
  width: 200,
  height: 200,
  points: [...Array(2000)].map(() => {
    return {
      x: random(0, 100),
      y: random(0, 100),
    };
  }),
});

const choice = random(cells);
svg.polygon(choice.points).fill("red");

choice.neighbors.forEach((n) => {
  svg.polygon(n.points).fill("green");
});

cells.forEach((c) => {
  svg.polygon(c.points).fill("none").stroke("#000");
});
