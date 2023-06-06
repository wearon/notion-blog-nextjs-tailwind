import colorName from "color-name";

export const colorToRGB = (color) => {
  const lowerCaseColor = color.toLowerCase();
  if (colorName[lowerCaseColor]) {
    return colorName[lowerCaseColor];
  }
  return null;
};
