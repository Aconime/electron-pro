export const generateHexColor = (): string => {
  const rangeR = Math.floor(Math.random() * 200) + 10;
  const rangeG = Math.floor(Math.random() * 200) + 10;
  const rangeB = Math.floor(Math.random() * 200) + 10;

  const r = Math.floor(Math.random() * rangeR) + 100;
  const g = Math.floor(Math.random() * rangeG) + 100;
  const b = Math.floor(Math.random() * rangeB) + 100;

  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
};
