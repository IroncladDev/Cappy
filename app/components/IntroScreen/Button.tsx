import { rcss, tokens } from "app/tokens";
import { HTMLMotionProps, motion } from "framer-motion";

const styles = [
  rcss.p(8),
  rcss.pr(16),
  rcss.borderRadius(128),
  rcss.flex.row,
  rcss.rowWithGap(8),
  rcss.align.center,
  {
    border: "none",
    cursor: "pointer",
  },
];

export default function Button(props: HTMLMotionProps<"button">) {
  return (
    <motion.button
      css={styles}
      initial={{
        background: tokens.backgroundHigher,
      }}
      whileHover={{
        background: tokens.backgroundHighest,
      }}
      whileTap={{
        background: tokens.backgroundHighest,
        scale: 0.98,
      }}
      {...props}
    />
  );
}
