import { random } from "./random.js";

function randomBias(min, max, bias, influence = 0.5) {
  const base = random(min, max);
  const mix = random(0, 1) * influence;

  return base * (1 - mix) + bias * mix;
}

export { randomBias };
