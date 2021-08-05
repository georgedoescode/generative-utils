import SimplexNoise from "simplex-noise";

const defaultOpts = {
  width: 200,
  height: 200,
  resolution: 8,
  xInc: 0.01,
  yInc: 0.01,
  seed: Math.random() * 1000,
};

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

function lookup(cells, width, height, cols, resolution) {
  return function (pos) {
    const x = Math.floor(clamp(pos.x, 0, width - 1) / resolution);
    const y = Math.floor(clamp(pos.y, 0, height - 1) / resolution);

    return cells[x + y * cols];
  };
}

function createNoiseGrid(opts) {
  opts = Object.assign({}, defaultOpts, opts);

  const simplex = new SimplexNoise(opts.seed);

  const numCols = opts.resolution;
  const numRows = opts.resolution;
  const colSize = opts.width / numCols;
  const rowSize = opts.height / numRows;

  const cells = new Array(numCols * numRows);

  let yOff = 0;

  for (let y = 0; y < opts.height; y += rowSize) {
    let xOff = 0;

    for (let x = 0; x < opts.width; x += colSize) {
      if (
        Math.floor(x + colSize) <= opts.width &&
        Math.floor(y + rowSize) <= opts.height
      ) {
        cells[Math.round(x / colSize + (y / rowSize) * numCols)] = {
          x,
          y,
          width: colSize,
          height: rowSize,
          noiseValue: simplex.noise2D(xOff, yOff),
        };

        xOff += opts.xInc;
      }
    }

    yOff += opts.yInc;
  }

  return {
    cells,
    lookup: lookup(cells, opts.width, opts.height, numCols, colSize),
  };
}

export { createNoiseGrid };
