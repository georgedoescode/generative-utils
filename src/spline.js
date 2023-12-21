function spline(points = [], tension = 1, close = false, cb) {
  if (points.length < 2) return ''

    // Helper function to calculate a Catmull-Rom spline point
    function catmullRom(p0, p1, p2, p3, t) {
        const t2 = t * t
        const t3 = t2 * t

        return {
            x:
                0.5 *
                (2 * p1.x +
                    (-p0.x + p2.x) * t +
                    (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
                    (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
            y:
                0.5 *
                (2 * p1.y +
                    (-p0.y + p2.y) * t +
                    (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
                    (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
        }
    }

    let path = 'M' + [points[0].x, points[0].y]
    cb && cb('MOVE', [points[0].x, points[0].y])

    const numPoints = points.length
    const segmentCount = 20 // Number of segments between control points
    const loopLimit = close ? numPoints : numPoints - 1

    for (let i = 0; i < loopLimit; i++) {
        const p0 = points[i === 0 ? (close ? numPoints - 1 : i) : i - 1]
        const p1 = points[i]
        const p2 = points[(i + 1) % numPoints]
        const p3 =
            points[
                i + 2 < numPoints ? i + 2 : close ? (i + 2) % numPoints : i + 1
            ]

        for (let j = 1; j <= segmentCount; j++) {
            const t = j / segmentCount
            const pt = catmullRom(p0, p1, p2, p3, t)

            path += 'L' + [pt.x, pt.y]
            cb && cb('LINE', [pt.x, pt.y])
        }
    }

    if (close) {
        path += 'Z'
    }

    return path
}

export { spline };
