import { expect, test } from "vitest";
import { lineRectIntersections } from "../src/main.ts";

test("1 top corner intersection ", () => {
  const line = { x1: 0, y1: 0, x2: 50, y2: 50 };
  const rect = { x: 50, y: 50, width: 50, height: 50 };

  const intersections = lineRectIntersections(line, rect);

  expect(intersections[0]).toEqual({ x: 50, y: 50 });
});

test("1 horizontal intersection", () => {
  const line = { x1: 0, y1: 25, x2: 50, y2: 25 };
  const rect = { x: 25, y: 0, width: 50, height: 50 };

  const intersections = lineRectIntersections(line, rect);

  expect(intersections[0]).toEqual({ x: 25, y: 25 });
});

test("1 vertical intersection", () => {
  const line = { x1: 25, y1: 0, x2: 25, y2: 50 };
  const rect = { x: 0, y: 25, width: 50, height: 50 };

  const intersections = lineRectIntersections(line, rect);

  expect(intersections[0]).toEqual({ x: 25, y: 25 });
});

test("2 intersections sorted by distance from line start", () => {
  const line = { x1: 0, y1: 0, x2: 100, y2: 100 };
  const rect = { x: 50, y: 50, width: 50, height: 50 };

  const intersections = lineRectIntersections(line, rect);

  expect(intersections[0]).toEqual({ x: 50, y: 50 });
  expect(intersections[1]).toEqual({ x: 100, y: 100 });
});

test("0 intersections", () => {
  const line = { x1: 0, y1: 0, x2: 100, y2: 0 };
  const rect = { x: 50, y: 50, width: 50, height: 50 };

  const intersections = lineRectIntersections(line, rect);

  expect(intersections).toBe(false);
});
