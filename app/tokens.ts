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
  m: (space: Space) => css({ margin: toSpace(space) }),
  mx: (space: Space) =>
    css({ marginLeft: toSpace(space), marginRight: toSpace(space) }),
  my: (space: Space) =>
    css({ marginTop: toSpace(space), marginBottom: toSpace(space) }),
  mt: (space: Space) => css({ marginTop: toSpace(space) }),
  mb: (space: Space) => css({ marginBottom: toSpace(space) }),
  ml: (space: Space) => css({ marginLeft: toSpace(space) }),
  mr: (space: Space) => css({ marginRight: toSpace(space) }),

  position: {
    static: css({ position: "static" }),
    relative: css({ position: "relative" }),
    absolute: css({ position: "absolute" }),
    fixed: css({ position: "fixed" }),
    sticky: css({ position: "sticky" }),
  },

  flex: {
    row: css({ display: "flex", flexDirection: "row" }),
    column: css({ display: "flex", flexDirection: "column" }),
    rowReverse: css({ display: "flex", flexDirection: "row-reverse" }),
    columnReverse: css({ display: "flex", flexDirection: "column-reverse" }),
    grow: (flexGrow: number) => css({ flexGrow }),
    growAndShrink: (flex: number) => css({ flexGrow: flex, flexShrink: flex }),
    shrink: (flex: number) => css({ flexShrink: flex }),
    wrap: css({ flexWrap: "wrap" }),
    wrapReverse: css({ flexWrap: "wrap-reverse" }),
  },

  display: {
    none: css({ display: "none" }),
    block: css({ display: "block" }),
    inline: css({ display: "inline" }),
    inlineBlock: css({ display: "inline-block" }),
    flex: css({ display: "flex" }),
    inlineFlex: css({ display: "inline-flex" }),
    grid: css({ display: "grid" }),
  },

  visibility: {
    visible: css({ visibility: "visible" }),
    hidden: css({ visibility: "hidden" }),
  },

  center: css({ alignItems: "center", justifyContent: "center" }),

  align: {
    start: css({ alignItems: "flex-start" }),
    center: css({ alignItems: "center" }),
    stretch: css({ alignItems: "stretch" }),
    baseline: css({ alignItems: "baseline" }),
    end: css({ alignItems: "flex-end" }),
  },

  justify: {
    start: css({ justifyContent: "flex-start" }),
    center: css({ justifyContent: "center" }),
    end: css({ justifyContent: "flex-end" }),
    spaceBetween: css({ justifyContent: "space-between" }),
    spaceAround: css({ justifyContent: "space-around" }),
    spaceEvenly: css({ justifyContent: "space-evenly" }),
  },

  srOnly: css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    borderWidth: 0,
  }),

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

  rowReverseWithGap: (space: Space) =>
    css({
      flexDirection: "row-reverse",
      "& > *": { marginRight: toSpace(space) },
      "& > *:first-child": { marginRight: 0 },
    }),

  colReverseWithGap: (space: Space) =>
    css({
      flexDirection: "column-reverse",
      "& > *": { marginBottom: toSpace(space) },
      "& > *:first-child": { marginBottom: 0 },
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

  font: {
    default: css({ fontFamily: "var(--font-family-default)" }),
    code: css({ fontFamily: "var(--font-family-code)" }),
  },

  fontWeight: {
    normal: css({ fontWeight: "var(--font-weight-regular)" }),
    medium: css({ fontWeight: "var(--font-weight-medium)" }),
    bold: css({ fontWeight: "var(--font-weight-bold)" }),
  },

  fontSize: (fontSize: number | string) => css({ fontSize }),

  textAlign: {
    left: css({ textAlign: "left" }),
    center: css({ textAlign: "center" }),
    right: css({ textAlign: "right" }),
  },

  backgroundImage: (url: string) =>
    css({
      backgroundImage: `url("${url}")`,
      backgroundPosition: "center",
      backgroundSize: "cover",
    }),

  cursor: {
    pointer: css({ cursor: "pointer" }),
    default: css({ cursor: "default" }),
    progress: css({ cursor: "progress" }),
    auto: css({ cursor: "auto" }),
  },

  overflow: (overflow: CSSProperties["overflow"]) => css({ overflow }),
  overflowX: (overflowX: CSSProperties["overflowX"]) => css({ overflowX }),
  overflowY: (overflowY: CSSProperties["overflowY"]) => css({ overflowY }),

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
    lineHeight: 1.2,
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

  background: (background: string) =>
    css({
      background,
    }),
};

export const tokens = baseTokens;
