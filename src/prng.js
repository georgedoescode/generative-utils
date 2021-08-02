import seedrandom from "seedrandom";

let prng = seedrandom();

function seedPRNG(seed) {
  prng = seedrandom(seed);
}

export { prng, seedPRNG };
