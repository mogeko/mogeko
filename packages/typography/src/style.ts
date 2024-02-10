import type { CSSObject } from "@emotion/serialize";

const round = (num: number) => {
  return num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, "$1")
    .replace(/\.0$/, "");
};
const rem = (px: number) => `${round(px / 16)}rem`;
const em = (px: number, base: number) => `${round(px / base)}em`;
const hsl = (val: string) => `hsl(${val})`;

export const styles: Styles = {
  DEFAULT: {
    a: {
      "--tw-shadow": "inset 0 -1px 0 0",
      "--tw-shadow-colored": "inset 0 -1px 0 0 var(--tw-shadow-color)",
      boxShadow:
        "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
      position: "relative",
      "&:hover": {
        "--tw-shadow": `inset 0 ${em(-8, 16)} 0 0 var(--tw-shadow-color)`,
        "--tw-shadow-color": hsl("var(--primary)"),
        "--tw-shadow-colored": `inset 0 ${em(-8, 16)} 0 0 var(--tw-shadow-color)`,
      },
    },
    blockquote: {
      borderColor: hsl("var(--primary)"),
      borderLeftWidth: "5px",
      fontStyle: "italic",
      lineHeight: rem(28),
      margin: `0 ${rem(28)} ${rem(28)} ${rem(24)}`,
      opacity: 0.8,
      paddingLeft: rem(20),
    },
    code: {
      fontFamily: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
      "&:not(:where(.astro-code *))": {
        backgroundColor: hsl("var(--muted)"),
        borderRadius: rem(4),
        fontSize: rem(14),
        fontWeight: 600,
        lineHeight: rem(20),
        padding: `${rem(3.2)} ${rem(4.8)}`,
        position: "relative",
      },
    },
    "h1, h2, h3, h4, h5, h6": {
      letterSpacing: em(-0.9, 36),
      scrollMargin: rem(80),
    },
    h1: {
      fontSize: rem(36),
      fontWeight: 900,
      lineHeight: rem(40),
      "&:not(:first-child)": {
        margin: `${rem(56)} 0 ${rem(28)}`,
      },
    },
    h2: {
      fontSize: rem(30),
      fontWeight: 800,
      lineHeight: rem(36),
      paddingBottom: rem(8),
      "&:not(:first-child)": {
        margin: `${rem(48)} 0 ${rem(24)}`,
      },
    },
    h3: {
      fontSize: rem(24),
      fontWeight: 700,
      lineHeight: rem(32),
      "&:not(:first-child)": {
        margin: `${rem(40)} 0 ${rem(20)}`,
      },
    },
    h4: {
      fontSize: rem(20),
      fontWeight: 600,
      lineHeight: rem(28),
      "&:not(:first-child)": {
        margin: `${rem(32)} 0 ${rem(16)}`,
      },
    },
    img: {
      borderRadius: "calc(var(--radius) - 4px)",
    },
    "ol, ul": {
      fontWeight: 500,
      lineHeight: 1.1,
      marginTop: rem(16),
      "& > li": {
        marginBottom: rem(16),
        paddingLeft: rem(12),
        "&::marker": {
          color: hsl("var(--primary)"),
        },
      },
    },
    ol: {
      listStyleType: "decimal",
    },
    p: {
      letterSpacing: em(-0.16, 16),
      lineHeight: rem(28),
      "&:not(:last-child)": {
        marginTop: rem(24),
      },
    },
    ul: {
      listStyleType: "disc",
    },
  },
  lg: {
    h1: {
      fontSize: rem(48),
      lineHeight: 1,
    },
    h2: {
      fontSize: rem(36),
      lineHeight: rem(40),
    },
    h3: {
      fontSize: rem(30),
      lineHeight: rem(36),
    },
  },
};

export type Styles = {
  [key: string]: CSSObject;
  DEFAULT: CSSObject;
};
