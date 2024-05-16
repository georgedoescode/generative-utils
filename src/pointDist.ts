import type { Point } from "./types";

export function pointDist(p1: Point, p2: Point): number {
  const a = p1.x - p2.x;
  const b = p1.y - p2.y;

  return Math.sqrt(a * a + b * b);
}
