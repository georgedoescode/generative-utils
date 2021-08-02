import { prng } from "./prng";

function random() {
  const isArray = Array.isArray(arguments[0]);

  if (isArray) {
    const targetArray = arguments[0];

    return targetArray[random(0, targetArray.length - 1, true)];
  } else {
    const min = arguments[0];
    const max = arguments[1];
    const clamp = arguments[2] || false;

    const val = prng() * (max - min) + min;

    return clamp ? Math.round(val) : val;
  }
}

export { random };
