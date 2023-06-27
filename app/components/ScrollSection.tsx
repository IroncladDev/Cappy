import { useEffect, useRef, useState } from "react";
import { rcss } from "app/tokens";
import useAppState from "app/hooks/useAppState";
import { useMotionValue, motion, MotionValue, useScroll } from "framer-motion";

export default function ScrollSection({
  height = "100vh",
  children,
  id,
  stick = true,
}: {
  height?: string | number;
  children: (percentage: MotionValue<number>) => React.ReactNode;
  id?: string;
  stick?: boolean;
}) {
  const initialHeightRef = useRef<HTMLDivElement>(null);

  const { isMobile, scrollY } = useAppState();

  const percentage = useMotionValue(0);

  useEffect(() => {
    if (!initialHeightRef.current) return;

    const heightSpacer = initialHeightRef.current.getBoundingClientRect();

    if (heightSpacer.top > window.innerHeight) {
      return;
    }

    const heightValue =
      1 -
      (heightSpacer.height - window.innerHeight + heightSpacer.top) /
        (heightSpacer.height - window.innerHeight);

    if (heightValue >= 0 && heightValue <= 1) {
      percentage.set(heightValue);
    }
  }, [initialHeightRef, scrollY, percentage]);

  return (
    <div css={[rcss.flex.row, rcss.width("100vw")]}>
      <div
        css={[rcss.width(8), rcss.height(height || "auto")]}
        ref={initialHeightRef}
      />
      {stick ? (
        <div
          css={[
            rcss.flex.grow(1),
            rcss.flex.column,
            rcss.position.sticky,
            rcss.top(0),
            rcss.height(isMobile && !stick ? height : "100vh"),
            rcss.overflow("hidden"),
          ]}
          id={id}
        >
          {children(percentage)}
        </div>
      ) : (
        <div
          css={[
            rcss.flex.grow(1),
            rcss.flex.column,
            rcss.top(0),
            rcss.height(height),
            rcss.overflow("hidden"),
          ]}
          id={id}
        >
          {children(percentage)}
        </div>
      )}
    </div>
  );
}
