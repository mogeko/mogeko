const round = (num: number) => {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
};
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;

export const styles = {
  DEFAULT: {
    h1: {
      fontSize: rem(36),
      fontWeight: round(900),
      letterSpacing: em(-0.9, 36),
      lineHeight: rem(40),
      scrollMargin: rem(80),
      "&:not(:first-child)": {
        margin: `${rem(56)} 0 ${rem(28)}`,
      },
    },
  },
  lg: {
    h1: {
      fontSize: rem(48),
      lineHeight: round(1),
    },
  },
};
