import { rcss, tokens } from "app/tokens";
import React from "react";
import Text from "../Text";
import { HTMLMotionProps, motion } from "framer-motion";
import Link from "next/link";

const levels = [
  tokens.backgroundDefault,
  tokens.backgroundHigher,
  tokens.backgroundHighest,
  tokens.outlineDimmest,
];

const borders = [
  tokens.backgroundHighest,
  tokens.outlineDimmest,
  tokens.outlineDimmer,
  tokens.outlineDefault,
];

export default function Button({
  text,
  small = false,
  iconLeft,
  iconRight,
  level = 0,
  scheme,
  href,
  target,
  style,
  ...props
}: {
  text: string;
  small?: boolean;
  children?: never;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  level?: number;
  href?: string;
  target?: "_blank";
  scheme?: [string?, string?, string?, string?];
  style?: HTMLMotionProps<"button">["style"];
} & Omit<HTMLMotionProps<"button">, "children" | "style">) {
  if (level > 2 || level < 0) {
    throw new Error("Level must be > 0 and < 3");
  }

  const button = (
    <motion.button
      aria-label={text}
      css={[
        rcss.borderRadius(8),
        rcss.px(small ? 8 : 12),
        rcss.py(small ? 4 : 8),
        rcss.flex.row,
        rcss.rowWithGap(8),
        rcss.center,
        {
          cursor: "pointer",
          fontFamily: tokens.fontFamilyDefault,
        },
      ]}
      style={{
        background: scheme?.[0] || levels[level],
        border: "solid 1px transparent",
        ...(style || {}),
      }}
      whileHover={{
        background: scheme?.[1] || levels[level + 1],
        borderColor: scheme?.[2] || borders[level],
      }}
      whileTap={{
        background: scheme?.[2] || borders[level],
        borderColor: scheme?.[3] || borders[level + 1],
      }}
      {...props}
    >
      {iconLeft ?? null}
      <Text variant={small ? "small" : "default"}>{text}</Text>
      {iconRight ?? null}
    </motion.button>
  );

  const linkButton = href?.startsWith("/") ? (
    <Link href={href} passHref>
      <a>{button}</a>
    </Link>
  ) : (
    <a href={href} target={target}>
      {button}
    </a>
  );

  return href ? linkButton : button;
}
