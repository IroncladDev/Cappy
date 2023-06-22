import useTokens from "app/hooks/useTokens";
import { rcss } from "app/tokens";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";

export default function Text({
  variant = "default",
  multiline,
  maxLines,
  color = "default",
  ...props
}: {
  variant?:
    | "default"
    | "small"
    | "subheadDefault"
    | "subheadBig"
    | "headerDefault"
    | "headerBig";
  multiline?: boolean;
  maxLines?: number;
  color?: "default" | "dimmer" | "dimmest";
} & HTMLMotionProps<"span">) {
  const tokens = useTokens();

  let fontSize = tokens.fontSizeDefault;
  let textColor = tokens.foregroundDefault;
  let lineHeight = tokens.lineHeightDefault;
  let fontWeight = tokens.fontWeightRegular;

  switch (variant) {
    case "small":
      fontSize = tokens.fontSizeSmall;
      lineHeight = tokens.lineHeightSmall;
      break;
    case "subheadDefault":
      fontSize = tokens.fontSizeSubheadDefault;
      lineHeight = tokens.lineHeightSubheadDefault;
      fontWeight = tokens.fontWeightMedium;
      break;
    case "subheadBig":
      fontSize = tokens.fontSizeSubheadBig;
      lineHeight = tokens.lineHeightSubheadBig;
      fontWeight = tokens.fontWeightMedium;
      break;
    case "headerDefault":
      fontSize = tokens.fontSizeHeaderDefault;
      lineHeight = tokens.lineHeightHeaderDefault;
      fontWeight = tokens.fontWeightBold;
      break;
    case "headerBig":
      fontSize = tokens.fontSizeHeaderBig;
      lineHeight = tokens.lineHeightHeaderBig;
      fontWeight = tokens.fontWeightBold;
      break;
  }

  switch (color) {
    case "dimmer":
      textColor = tokens.foregroundDimmer;
      break;
    case "dimmest":
      textColor = tokens.foregroundDimmest;
      break;
  }

  return (
    <motion.span
      css={[
        {
          color: textColor,
          fontSize,
          lineHeight,
          fontFamily:
            variant === "default" || variant === "small"
              ? tokens.fontFamilyDefault
              : undefined,
          fontWeight,
          display: "inline",
          overflowWrap: "break-word",
          "& > a": {
            color: tokens.foregroundDimmest,
            textDecoration: "underline",
            "&:hover": {
              color: tokens.foregroundDimmer,
            },
          },
        },
        multiline
          ? {
              maxWidth: 600,
            }
          : rcss.truncate,
        maxLines
          ? {
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: maxLines,
              WebkitBoxOrient: "vertical",
            }
          : null,
      ]}
      {...props}
    />
  );
}
