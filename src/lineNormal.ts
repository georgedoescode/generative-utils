import type { Line } from "./types";

export function lineNormal({ x1, y1, x2, y2 }: Line) {
  let nx = x2 - x1;
  let ny = y2 - y1;

  const len = Math.sqrt(nx * nx + ny * ny);

  nx /= len;
  ny /= len;

  return [-ny, nx];
}
