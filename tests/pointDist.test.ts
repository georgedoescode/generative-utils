import { expect, test } from "vitest";
import { pointDist } from "../src/main.ts";

test("0px distance when both points are identical", () => {
  expect(pointDist({ x: 0, y: 0 }, { x: 0, y: 0 })).toBe(0);
});

test("100px horizontal distance", () => {
  expect(pointDist({ x: 0, y: 0 }, { x: 100, y: 0 })).toBe(100);
});

test("100px vertical distance", () => {
  expect(pointDist({ x: 0, y: 100 }, { x: 0, y: 0 })).toBe(100);
});

test("horizontal + vertical 100px distance", () => {
  expect(pointDist({ x: 0, y: 0 }, { x: 100, y: 100 })).toBeCloseTo(141.421);
});
