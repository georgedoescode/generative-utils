import { expect, test } from "vitest";
import { lineNormal } from "../src/main.ts";

test("horizontal line", () => {
  expect(lineNormal({ x1: 0, y1: 0, x2: 100, y2: 0 })).toEqual([-0, 1]);
});

test("vertical line", () => {
  expect(lineNormal({ x1: 0, y1: 0, x2: 0, y2: 100 })).toEqual([-1, 0]);
});

test("diagonal line", () => {
  const result = lineNormal({ x1: 0, y1: 0, x2: 100, y2: 100 });

  expect(result[0]).toBeCloseTo(-0.7071);
  expect(result[1]).toBeCloseTo(0.7071);
});
