import { random } from "./random.js";

function randomSnap(min, max, snapInc) {
  return Math.round(random(min, max) / snapInc) * snapInc;
}

export { randomSnap };
