import { Delaunay } from "d3-delaunay";
import { polygonCentroid } from "d3";
import { distToSegment } from "./distToSegment";

const defaultOpts = {
  width: 1024,
  height: 1024,
  points: [],
  relaxIterations: 8,
};

function createVoronoiDiagram(opts) {
  opts = Object.assign({}, defaultOpts, opts);

  opts.points = opts.points.map((point) => [point.x, point.y]);

  const delaunay = Delaunay.from(opts.points);
  const voronoi = delaunay.voronoi([0, 0, opts.width, opts.height]);

  const diagramPoints = [];

  for (let i = 0; i < delaunay.points.length; i += 2) {
    const x = delaunay.points[i];
    const y = delaunay.points[i + 1];

    diagramPoints.push({
      x,
      y,
    });
  }

  for (let k = 0; k < opts.relaxIterations; k++) {
    for (let i = 0; i < delaunay.points.length; i += 2) {
      const cell = voronoi.cellPolygon(i >> 1);

      if (cell === null) continue;

      const x0 = delaunay.points[i];
      const y0 = delaunay.points[i + 1];

      const [x1, y1] = polygonCentroid(cell);

      delaunay.points[i] = x0 + (x1 - x0) * 1;
      delaunay.points[i + 1] = y0 + (y1 - y0) * 1;
    }

    voronoi.update();
  }

  let cells = [];

  for (let i = 0; i < delaunay.points.length; i += 2) {
    const cell = voronoi.cellPolygon(i >> 1);

    if (cell === null) continue;

    cells.push({
      ...formatCell(cell),
      neighbors: [...voronoi.neighbors(i)].map((index) => {
        return {
          ...formatCell(voronoi.cellPolygon(index)),
        };
      }),
    });
  }

  return {
    cells: cells.map((cell, index) => {
      const neighbors = [...voronoi.neighbors(index)];

      cell.neighbors = neighbors.map((index) => cells[index]);

      return cell;
    }),
    points: diagramPoints,
  };
}

function formatCell(points) {
  return {
    points,
    innerCircleRadius: getClosestEdgeToCentroid(points),
    centroid: {
      x: polygonCentroid(points)[0],
      y: polygonCentroid(points)[1],
    },
  };
}

function getClosestEdgeToCentroid(points) {
  const centroid = polygonCentroid(points);
  const pointsSorted = sortPointsByAngle(centroid, points);

  let closest = distToSegment(centroid, pointsSorted[0], pointsSorted[1]);

  for (let i = 1; i < points.length - 1; i++) {
    if (points[i + 1]) {
      const dist = distToSegment(
        centroid,
        pointsSorted[i],
        pointsSorted[i + 1]
      );

      if (dist < closest) {
        closest = dist;
      }
    }
  }

  return closest;
}

function sortPointsByAngle(centroid, points) {
  const centerPoint = centroid;
  const sorted = points.slice(0);

  const sortByAngle = (p1, p2) => {
    return (
      (Math.atan2(p1[1] - centerPoint[1], p1[0] - centerPoint[0]) * 180) /
        Math.PI -
      (Math.atan2(p2[1] - centerPoint[1], p2[0] - centerPoint[0]) * 180) /
        Math.PI
    );
  };

  sorted.sort(sortByAngle);

  return sorted;
}

export { createVoronoiDiagram };
