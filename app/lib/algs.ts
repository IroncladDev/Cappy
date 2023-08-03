export const constrain = (value: number, min: number = 0, max: number = 1) =>
  Math.max(min, Math.min(max, value));

export const pOffset = (
  p: number,
  offset: number,
  options?: {
    frac?: number;
    constrain?: boolean;
  }
) => {
  const cp = constrain(p, 0, 1);
  const coffset = constrain(offset, 0, 1);
  const cfrac = constrain(options?.frac || 1 - offset, 0, 1);

  return options?.constrain !== false
    ? constrain((cp - coffset) * (1 / cfrac), 0, 1)
    : (cp - coffset) * (1 / cfrac);
};
