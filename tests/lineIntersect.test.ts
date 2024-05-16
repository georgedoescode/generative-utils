import { expect, test } from "vitest";
import { lineIntersect } from "../src/main.ts";

test("no intersection, lines 100px apart", () => {
  const l1 = { x1: 0, y1: 0, x2: 100, y2: 0 };
  const l2 = { x1: 0, y1: 100, x2: 100, y2: 100 };

  expect(lineIntersect(l1, l2)).toEqual(false);
});

test("no intersection, lines 1px apart", () => {
  const l1 = { x1: 0, y1: 0, x2: 100, y2: 0 };
  const l2 = { x1: 0, y1: 1, x2: 100, y2: 1 };

  expect(lineIntersect(l1, l2)).toBe(false);
});

test("1 line has a length of 0", () => {
  const l1 = { x1: 0, y1: 0, x2: 0, y2: 0 };
  const l2 = { x1: 0, y1: 0, x2: 100, y2: 0 };

  expect(lineIntersect(l1, l2)).toBe(false);
  expect(lineIntersect(l2, l1)).toBe(false);
});

test("parallel lines", () => {
  const l1 = { x1: 0, y1: 0, x2: 100, y2: 0 };
  const l2 = { x1: 0, y1: 0, x2: 100, y2: 0 };

  expect(lineIntersect(l1, l2)).toBe(false);
});

test("intersection point is along both line segments", () => {
  const l1 = { x1: 0, y1: 0, x2: 100, y2: 0 };
  const l2 = { x1: 0, y1: 0.1, x2: 100, y2: 100 };

  expect(lineIntersect(l1, l2)).toBe(false);
});

test("intersection start", () => {
  const l1 = { x1: 0, y1: 0, x2: 100, y2: 0 };
  const l2 = { x1: 0, y1: 0, x2: 100, y2: 100 };

  expect(lineIntersect(l1, l2)).toEqual({ x: 0, y: 0 });
});

test("intersection end", () => {
  const l1 = { x1: 0, y1: 0, x2: 100, y2: 100 };
  const l2 = { x1: 100, y1: 100, x2: 100, y2: 200 };

  expect(lineIntersect(l1, l2)).toEqual({ x: 100, y: 100 });
});
