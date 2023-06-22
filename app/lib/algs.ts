export const constrain = (value: number, min: number = 0, max: number = 1) =>
  Math.max(min, Math.min(max, value));
