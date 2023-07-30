import { memo, useRef } from "react";
import { rcss } from "app/tokens";
import useAppState from "app/hooks/useAppState";
import {
  useMotionValue,
  MotionValue,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { constrain } from "app/lib/algs";

const styles = {
  outerContainer: [rcss.flex.row, rcss.width("100vw")],
  contentContainerSticky: [
    rcss.flex.grow(1),
    rcss.flex.column,
    rcss.position.sticky,
    rcss.top(0),
    rcss.overflow("hidden"),
  ],
  contentContainer: [
    rcss.flex.grow(1),
    rcss.flex.column,
    rcss.top(0),
    rcss.overflow("hidden"),
  ],
};

const ScrollSection = memo(
  ({
    height = "100vh",
    children,
    id,
    stick = true,
  }: {
    height?: string | number;
    children: (percentage: MotionValue<number>) => React.ReactNode;
    id?: string;
    stick?: boolean;
  }) => {
    const initialHeightRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const { isMobile } = useAppState();

    const percentage = useMotionValue(0);

    useMotionValueEvent(scrollY, "change", () => {
      if (!initialHeightRef.current) return;

      const heightSpacer = initialHeightRef.current.getBoundingClientRect();

      if (heightSpacer.top > window.innerHeight) {
        return;
      }

      const heightValue =
        1 -
        (heightSpacer.height - window.innerHeight + heightSpacer.top) /
          (heightSpacer.height - window.innerHeight);

      percentage.set(constrain(heightValue, 0, 1));
    });

    return (
      <div css={styles.outerContainer}>
        <div
          ref={initialHeightRef}
          style={{
            height,
          }}
        />
        {stick ? (
          <div
            css={styles.contentContainerSticky}
            id={id}
            style={{
              height: isMobile && !stick ? height : "100vh",
            }}
          >
            {children(percentage)}
          </div>
        ) : (
          <div
            css={styles.contentContainer}
            id={id}
            style={{
              height,
            }}
          >
            {children(percentage)}
          </div>
        )}
      </div>
    );
  }
);

export default ScrollSection;
