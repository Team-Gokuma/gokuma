const calcRem = (size) => `${size / 16}rem`;
const color = {
  black: "#3a3a3a",
  white: "#fff",
  yellow: "#FFC750",
  orange: "#F7941E",
  purple: "#7E83D2",
  green: "#5AB66A",
  lightgray: "#f5f5f5",
  gray: "#f8f8f8",
  darkgray: "#bdbdbd",
  lightblack: "#757575",
  background: "#FDFDFE",
};

const font = {
  // size
  medium: `
  font-size: ${calcRem(18)}
  `,
  large: `
  font-size: ${calcRem(20)}
  `,
  xlarge: `
  font-size: ${calcRem(24)}
  `,
  xxlarge: `
  font-size: ${calcRem(28)}
  `,
  // weight
  bold: `
  font-family: 'MinSans-Bold'
  `,
  normal: `
  font-family: 'MinSans-Regular'
  `,
};

const theme = {
  color,
  font,
  calcRem,
};

export default theme;
