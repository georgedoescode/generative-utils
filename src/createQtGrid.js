import Quadtree from "@timohausmann/quadtree-js";

const defaultQtOpts = {
  width: 1024,
  height: 1024,
  points: [],
  gap: 0,
  maxQtObjects: 10,
  maxQtLevels: 4,
};

function getGridArea(bounds, colSize, rowSize) {
  return {
    col: {
      start: bounds.x / colSize,
      end: (bounds.x + bounds.width) / colSize,
    },
    row: {
      start: bounds.y / rowSize,
      end: (bounds.y + bounds.height) / rowSize,
    },
  };
}

function getIndividualQtNodes(node) {
  const individualNodes = [];

  (function r(node) {
    if (node.nodes.length === 0) {
      individualNodes.push(node);
    } else {
      node.nodes.forEach((n) => r(n));
    }
  })(node);

  return individualNodes;
}

function createQtGrid(opts) {
  opts = Object.assign({}, defaultQtOpts, opts);

  const quadTree = new Quadtree(
    {
      x: 0,
      y: 0,
      width: opts.width,
      height: opts.height,
    },
    opts.maxQtObjects,
    opts.maxQtLevels
  );

  opts.points.forEach((point) => {
    quadTree.insert(point);
  });

  const maxSubdivisions = Math.pow(2, opts.maxQtLevels);
  const colSize = opts.width / maxSubdivisions;
  const rowSize = opts.height / maxSubdivisions;

  return {
    width: opts.width,
    height: opts.height,
    cols: maxSubdivisions,
    rows: maxSubdivisions,
    areas: getIndividualQtNodes(quadTree).map(({ bounds }) => {
      return {
        x: bounds.x + opts.gap,
        y: bounds.y + opts.gap,
        width: bounds.width - opts.gap * 2,
        height: bounds.height - opts.gap * 2,
        ...getGridArea(bounds, colSize, rowSize),
      };
    }),
  };
}

export { createQtGrid };
