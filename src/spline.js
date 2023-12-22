function spline(points = [], tension = 0.5, close = false, cb) {

    let tensionInv  = tension * 0.5;
    if (points.length < 2) return ''

    // Helper function to calculate a point on the curve
    function catmullRom(p0, p1, p2, p3, t, tension) {
        const t2 = t * t
        const t3 = t2 * t

        // Calculate tension vectors
        const m0 = {
            x: (p2.x - p0.x) * tension,
            y: (p2.y - p0.y) * tension,
        }
        const m1 = {
            x: (p3.x - p1.x) * tension,
            y: (p3.y - p1.y) * tension,
        }

        // Calculate the point
        return {
            x:
                (2 * p1.x - 2 * p2.x + m0.x + m1.x) * t3 +
                (-3 * p1.x + 3 * p2.x - 2 * m0.x - m1.x) * t2 +
                m0.x * t +
                p1.x,
            y:
                (2 * p1.y - 2 * p2.y + m0.y + m1.y) * t3 +
                (-3 * p1.y + 3 * p2.y - 2 * m0.y - m1.y) * t2 +
                m0.y * t +
                p1.y,
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
            const pt = catmullRom(p0, p1, p2, p3, t, tensionInv)

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
