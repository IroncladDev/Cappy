import { css } from "@emotion/react";
import { CSSProperties } from "react";

const baseTokens = {
  fontWeightRegular: "var(--font-weight-regular)",
  fontWeightMedium: "var(--font-weight-medium)",
  fontWeightBold: "var(--font-weight-bold)",

  fontSizeSmall: "var(--font-size-small)",
  fontSizeDefault: "var(--font-size-default)",
  fontSizeSubheadDefault: "var(--font-size-subhead-default)",
  fontSizeSubheadBig: "var(--font-size-subhead-big)",
  fontSizeHeaderDefault: "var(--font-size-header-default)",
  fontSizeHeaderBig: "var(--font-size-header-big)",

  lineHeightSmall: "var(--line-height-small)",
  lineHeightDefault: "var(--line-height-default)",
  lineHeightSubheadDefault: "var(--line-height-subhead-default)",
  lineHeightSubheadBig: "var(--line-height-subhead-big)",
  lineHeightHeaderDefault: "var(--line-height-header-default)",
  lineHeightHeaderBig: "var(--line-height-header-big)",

  fontFamilyDefault: `var(--font-family-default)`,
  backgroundRoot: "var(--background-root)",
  backgroundDefault: "var(--background-default)",
  backgroundHigher: "var(--background-higher)",
  backgroundHighest: "var(--background-highest)",

  foregroundDimmer: "var(--foreground-dimmer)",
  foregroundDimmest: "var(--foreground-dimmest)",
  foregroundDefault: "var(--foreground-default)",

  accentDefault: "var(--accent-default)",
  accentDimmer: "var(--accent-dimmer)",
  accentDimmest: "var(--accent-dimmest)",

  outlineDimmest: "var(--outline-dimmest)",
  outlineDimmer: "var(--outline-dimmer)",
  outlineDefault: "var(--outline-default)",

  maxBodyWidth: 1000,
};

export type Space =
  | 0
  | 2
  | 4
  | 8
  | 12
  | 16
  | 24
  | 32
  | 40
  | 48
  | 64
  | 80
  | 128
  | 256;
const toSpace = (space: Space) => `${space}px`;

type BorderRadius = Space | "full";
const toBorderRadius = (radius: BorderRadius) => {
  if (radius === "full") {
    return "50%";
  }

  return radius + "px";
};

export const rcss = {
  p: (space: Space) => css({ padding: toSpace(space) }),
  px: (space: Space) =>
    css({ paddingLeft: toSpace(space), paddingRight: toSpace(space) }),
  py: (space: Space) =>
    css({ paddingTop: toSpace(space), paddingBottom: toSpace(space) }),
  pt: (space: Space) => css({ paddingTop: toSpace(space) }),
  pb: (space: Space) => css({ paddingBottom: toSpace(space) }),
  pl: (space: Space) => css({ paddingLeft: toSpace(space) }),
  pr: (space: Space) => css({ paddingRight: toSpace(space) }),

  position: {
    relative: css({ position: "relative" }),
    absolute: css({ position: "absolute" }),
    fixed: css({ position: "fixed" }),
    sticky: css({ position: "sticky" }),
  },

  flex: {
    row: css({ display: "flex", flexDirection: "row" }),
    column: css({ display: "flex", flexDirection: "column" }),
    grow: (flexGrow: number) => css({ flexGrow }),
    growAndShrink: (flex: number) => css({ flexGrow: flex, flexShrink: flex }),
    basis: (basis: Space) => css({ flexBasis: toSpace(basis) }),
    shrink: (flex: number) => css({ flexShrink: flex }),
    wrap: css({ flexWrap: "wrap" }),
  },

  center: css({ alignItems: "center", justifyContent: "center" }),

  align: {
    start: css({ alignItems: "flex-start" }),
    center: css({ alignItems: "center" }),
    end: css({ alignItems: "flex-end" }),
  },

  justify: {
    center: css({ justifyContent: "center" }),
    end: css({ justifyContent: "flex-end" }),
    spaceBetween: css({ justifyContent: "space-between" }),
  },

  rowWithGap: (space: Space) =>
    css({
      flexDirection: "row",
      "& > *": { marginRight: toSpace(space) },
      "& > *:last-child": { marginRight: 0 },
    }),

  colWithGap: (space: Space) =>
    css({
      flexDirection: "column",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:last-child": { marginBottom: 0 },
    }),

  borderRadius: (
    ...radius:
      | [BorderRadius]
      | [BorderRadius, BorderRadius, BorderRadius, BorderRadius]
  ) => {
    return css({
      borderRadius: radius.map(toBorderRadius).join(" "),
    });
  },

  overflow: (overflow: CSSProperties["overflow"]) => css({ overflow }),
  overflowX: (overflowX: CSSProperties["overflowX"]) => css({ overflowX }),

  zIndex: (zIndex: number) => css({ zIndex }),

  top: (top: number | string) => css({ top }),
  bottom: (bottom: number | string) => css({ bottom }),
  left: (left: number | string) => css({ left }),
  right: (right: number | string) => css({ right }),

  width: (width: number | string) => css({ width }),
  height: (height: number | string) => css({ height }),
  maxWidth: (maxWidth: number | string) => css({ maxWidth }),
  maxHeight: (maxHeight: number | string) => css({ maxHeight }),
  minWidth: (minWidth: number | string) => css({ minWidth }),
  minHeight: (minHeight: number | string) => css({ minHeight }),

  truncate: css({
    display: "inline-block",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  }),

  linearGradient: (angle: number, colors: Array<string>) =>
    css({
      backgroundImage: `linear-gradient(${angle}deg, ${colors.join(", ")})`,
    }),

  grid: {
    stack: css({
      display: "grid",
      gridTemplateColumns: "1fr",
    }),
    stackElement: css({
      gridRowStart: 1,
      gridColumnStart: 1,
      width: "100%",
      height: "100%",
    }),
  },
};

export const tokens = baseTokens;
