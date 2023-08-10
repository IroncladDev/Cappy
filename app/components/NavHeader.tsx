import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Nav, { links, NavItem } from "./Nav";
import { useState } from "react";
import { rcss, tokens } from "app/tokens";
import Text from "./Text";
import useAppState from "app/hooks/useAppState";

const styles = {
  header: [
    rcss.flex.row,
    rcss.center,
    {
      background: `linear-gradient(90deg, ${tokens.backgroundDefault}, ${tokens.backgroundHigher})`,
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      borderBottom: `solid 2px ${tokens.backgroundHighest}`,
    },
  ],
  headerContent: (isMobile: boolean) => [
    rcss.px(16),
    rcss.py(8),
    rcss.flex.row,
    isMobile ? rcss.center : rcss.align.center,
    rcss.maxWidth(tokens.maxBodyWidth),
    rcss.flex.grow(1),
    rcss.rowWithGap(8),
  ],
};

export default function NavHeader() {
  const [showHeader, setShowHeader] = useState(true);

  const { isMobile } = useAppState();

  const { scrollY } = useScroll();

  const prevScroll = useMotionValue(0);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (v !== prevScroll.get()) {
      setShowHeader(v < window.innerHeight / 4);
      prevScroll.set(v);
    }
  });

  return (
    <>
      {showHeader ? null : <Nav />}
      <AnimatePresence>
        {showHeader ? (
          <motion.div
            css={styles.header}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
          >
            <div css={styles.headerContent(isMobile)}>
              {isMobile ? null : (
                <img src="/logo/64-round.webp" width={36} height={36} />
              )}

              {isMobile ? null : <div css={rcss.flex.grow(1)} />}

              {links.map(({ text, href, icon }, i) => (
                <NavItem
                  key={i}
                  text={text}
                  href={href}
                  icon={icon || null}
                  small
                />
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
