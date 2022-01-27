function getRandomNumberNative(min = 0, max = 0): number {
  let random = Math.floor(Math.random() * 10000000000);
  if (max) {
    random = random % (max - min + 1);
  }
  return random + min;
}

export function getRandomNumber(min = 0, max = 0, iterations = 100): number {
  if (iterations <= 1) return getRandomNumberNative(min, max);

  const randoms: Array<number> = [];

  for (let i = 0; i < iterations; i++) {
    randoms.push(getRandomNumberNative(min, max));
  }

  return Array.from(new Set(randoms))
    .map((distinctValue) => ({
      distinctValue,
      occurences: randoms.filter((a) => a === distinctValue).length,
    }))
    .sort((a, b) => b.occurences - a.occurences)[0].distinctValue;
}
