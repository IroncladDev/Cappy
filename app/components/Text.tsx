import { rcss, tokens } from "app/tokens";
import { HTMLMotionProps, motion } from "framer-motion";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const sanitize = (md: string) =>
  sanitizeHtml(md, {
    allowedTags: ["b", "i", "em", "strong", "a"],
    allowedAttributes: {
      a: ["href"],
    },
  });

export default function Text({
  variant = "default",
  multiline,
  maxLines,
  color = "default",
  children,
  innerRef,
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
  children: string;
  innerRef?: React.RefObject<HTMLSpanElement>;
} & Omit<HTMLMotionProps<"span">, "children">) {
  let fontSize = tokens.fontSizeDefault;
  let textColor = tokens.foregroundDefault;
  let lineHeight = tokens.lineHeightDefault;
  let fontWeight = tokens.fontWeightRegular;

  const markdown = marked(children, {
    headerIds: false,
    mangle: false,
  });

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
      ref={innerRef}
      css={[
        {
          color: textColor,
          fontSize,
          lineHeight,
          fontFamily:
            variant === "headerBig" || variant === "headerDefault"
              ? undefined
              : tokens.fontFamilyDefault,
          fontWeight,
          display: "inline",
          overflowWrap: "break-word",
          "& a": {
            color: tokens.foregroundDimmest,
            textDecoration: "underline",
            "&:hover": {
              color: tokens.foregroundDimmer,
            },
          },
          "& strong": {
            fontWeight: tokens.fontWeightBold,
            color: tokens.foregroundDefault,
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
      dangerouslySetInnerHTML={{ __html: sanitize(markdown) }}
      {...{
        ...props,
        children: undefined,
      }}
    ></motion.span>
  );
}
