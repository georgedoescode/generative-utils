function random() {
  const isArray = Array.isArray(arguments[0]);

  if (isArray) {
    const targetArray = arguments[0];

    return targetArray[random(0, targetArray.length - 1, true)];
  } else {
    const min = arguments[0];
    const max = arguments[1];
    const clamp = arguments[2] || false;

    const val = Math.random() * (max - min) + min;

    return clamp ? Math.round(val) : val;
  }
}

function randomBias(min, max, bias, influence) {
  const base = random(min, max);
  const mix = random(0, 1) * influence;

  return base * (1 - mix) + bias * mix;
}

function randomSnap(min, max, snapInc) {
  return Math.round(random(min, max) / snapInc) * snapInc;
}

export { random, randomBias, randomSnap };
