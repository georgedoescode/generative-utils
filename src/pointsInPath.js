function pointsInPath(path, numPoints = 10) {
  const pathLength = path.getTotalLength();
  const step = pathLength / numPoints;
  const points = [];

  for (let i = 0; i < pathLength; i += step) {
    points.push(path.getPointAtLength(i));
  }

  return points;
}

export { pointsInPath };
