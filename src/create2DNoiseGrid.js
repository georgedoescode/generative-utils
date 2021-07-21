import SimplexNoise from "https://cdn.skypack.dev/simplex-noise";

const defaultOpts = {
  width: 1024,
  height: 1024,
  cols: 24,
  rows: 24,
  xInc: 0.01,
  yInc: 0.01,
};

const simplex = new SimplexNoise();

function create2DNoiseGrid(opts) {
  opts = Object.assign({}, defaultOpts, opts);

  const cells = [];

  const colSize = opts.width / opts.cols;
  const rowSize = opts.height / opts.rows;

  let xOff = 0;

  for (let x = 0; x < opts.width - colSize; x += colSize) {
    xOff += opts.xInc;

    let yOff = 0;

    for (let y = 0; y < opts.height - rowSize; y += rowSize) {
      const noise = simplex.noise2D(xOff, yOff);

      cells.push({
        x,
        y,
        width: colSize,
        height: rowSize,
        noiseValue: noise,
      });

      yOff += opts.yInc;
    }
  }

  return cells;
}

export { create2DNoiseGrid };
