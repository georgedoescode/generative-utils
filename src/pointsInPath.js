function pointsInPath(path, numPoints = 10) {
  const pathLength = path.getTotalLength()
  const step = pathLength / (numPoints - 1) // Adjusted step to account for the end point
  const points = []

  for (let i = 0; i < numPoints - 1; i++) {
      points.push(path.getPointAtLength(i * step))
  }

  // Ensure the last point is the end of the path
  points.push(path.getPointAtLength(pathLength))

  return points
}

export { pointsInPath };
