import type { Line, Rect, Point } from "./types";
import { lineIntersect } from "./lineIntersect";
import { pointDist } from "./pointDist";

export function lineRectIntersections(
  line: Line,
  rect: Rect
): Array<Point> | false {
  const rectLines: Array<Line> = [
    { x1: rect.x, y1: rect.y, x2: rect.x + rect.width, y2: rect.y },
    {
      x1: rect.x + rect.width,
      y1: rect.y,
      x2: rect.x + rect.width,
      y2: rect.y + rect.height,
    },
    {
      x1: rect.x + rect.width,
      y1: rect.y + rect.height,
      x2: rect.x,
      y2: rect.y + rect.height,
    },
    {
      x1: rect.x,
      y1: rect.y + rect.height,
      x2: rect.x,
      y2: rect.y,
    },
  ];

  const intersections: Array<Point> = [];

  for (let i = 0; i < rectLines.length; i++) {
    const intersection = lineIntersect(line, rectLines[i]);

    if (intersection) {
      let isDuplicate = false;

      for (let j = 0; j < intersections.length; j++) {
        if (
          intersections[j].x === intersection.x &&
          intersections[j].y === intersection.y
        ) {
          isDuplicate = true;
        }
      }

      if (!isDuplicate) intersections.push(intersection);
    }
  }

  if (intersections.length === 0) {
    return false;
  }

  return intersections.sort(
    (a, b) =>
      pointDist(a, { x: line.x1, y: line.y1 }) -
      pointDist(b, { x: line.x1, y: line.y1 })
  );
}
