const getRGB = (hex) => {
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
};

export const randomHexColor = () =>
  Math.floor(Math.random() * 16777215).toString(16);

export const complementaryColor = (hex) => {
  const padZero = (str) => ("00" + str).slice(-2);
  const invertColor = (digit) => padZero((255 - digit).toString(16));
  const { r, g, b } = getRGB(hex);

  return invertColor(r) + invertColor(g) + invertColor(b);
};

export const textColor = (hex) => {
  const { r, g, b } = getRGB(hex);
  const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

  return brightness > 125 ? "444444" : "efefef";
};
