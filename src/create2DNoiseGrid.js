import SimplexNoise from "https://cdn.skypack.dev/simplex-noise";

const defaultOpts = {
  width: 1024,
  height: 1024,
  resolution: 10,
  xInc: 0.01,
  yInc: 0.01,
};

const simplex = new SimplexNoise();

function create2DNoiseGrid(opts) {
  opts = Object.assign({}, defaultOpts, opts);

  const cells = [];

  const cols = 1 + opts.width / opts.resolution;
  const rows = 1 + opts.height / opts.resolution;

  let xOff = 0;

  for (let i = 0; i < cols - 1; i++) {
    xOff += opts.xInc;

    let yOff = 0;

    for (let j = 0; j < rows - 1; j++) {
      const noise = simplex.noise2D(xOff, yOff);

      cells.push({
        x: i * opts.resolution,
        y: j * opts.resolution,
        width: opts.resolution,
        height: opts.resolution,
        noiseValue: noise,
      });

      yOff += opts.yInc;
    }
  }

  return cells;
}

export { create2DNoiseGrid };
