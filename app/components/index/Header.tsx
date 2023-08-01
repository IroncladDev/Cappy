import { rcss, tokens } from "app/tokens";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import HeaderFlag from "./HeaderFlag";
import Text from "../Text";
import Canvas from "./Canvas";
import { useRef } from "react";
import { constrain, pOffset } from "app/lib/algs";
import { homepage } from "app/config";
import useAppState from "app/hooks/useAppState";
import Intro from "./Intro";

function SliceClip({ percentage }: { percentage: MotionValue<number> }) {
  const percentageLastQuarter = useTransform(percentage, (p) =>
    pOffset(p, 0.75)
  );

  const smoothPercentage = useSpring(percentageLastQuarter, {
    mass: 0.1,
  });

  const y = useTransform(smoothPercentage, (v) => 0.5 + v / 2);

  const height = useTransform(smoothPercentage, (v) => 0.5 - v / 2);

  return (
    <svg width="0" height="0">
      <defs>
        <clipPath id="slicer" clipPathUnits="objectBoundingBox">
          <motion.rect x="0" y="0" width="1" style={{ height }} />
          <motion.rect x="0" width="1" style={{ height, y }} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function IndexHeader({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  const contentBgRef = useRef<HTMLDivElement>(null);

  const { isMobile } = useAppState();

  const onFlash = async () => {
    console.log("Called");
    contentBgRef.current.style.background = "rgba(255, 255, 255, 0.5)";

    setTimeout(() => {
      contentBgRef.current.style.background = "rgba(255, 255, 255, 0)";
    }, 100);
  };

  return (
    <>
      <SliceClip percentage={percentage} />
      <div css={[rcss.flex.grow(1), rcss.grid.stack]}>
        <Intro percentage={percentage} />

        <div
          css={[
            rcss.flex.grow(1),
            rcss.grid.stack,
            rcss.grid.stackElement,
            rcss.linearGradient(0, [
              tokens.backgroundRoot,
              tokens.backgroundDefault,
            ]),
            {
              clipPath: "url(#slicer)",
            },
          ]}
        >
          {isMobile ? null : (
            <div
              css={[
                rcss.grid.stackElement,
                rcss.position.relative,
                rcss.zIndex(0),
              ]}
            >
              <Canvas percentage={percentage} onFlash={onFlash} />
            </div>
          )}

          <div
            css={[
              rcss.grid.stackElement,
              rcss.position.relative,
              rcss.zIndex(0),
            ]}
          >
            <HeaderFlag percentage={percentage} />
          </div>

          <motion.div
            css={[
              rcss.grid.stackElement,
              rcss.flex.row,
              rcss.p(16),
              rcss.center,
              rcss.zIndex(1),
              {
                transition: "background 0.5s linear",
              },
            ]}
            ref={contentBgRef}
          >
            <div
              css={[
                rcss.flex.row,
                rcss.maxWidth(tokens.maxBodyWidth),
                rcss.width("100%"),
                rcss.align.center,
              ]}
            >
              <div
                css={[
                  rcss.flex.growAndShrink(1),
                  rcss.flex.basis(0),
                  rcss.p(16),
                  rcss.flex.column,
                  rcss.align.center,
                ]}
              >
                <div
                  css={[
                    rcss.flex.column,
                    rcss.colWithGap(16),
                    rcss.maxWidth(360),
                  ]}
                >
                  <div css={[rcss.flex.column, rcss.colWithGap(8)]}>
                    <Text variant="headerBig" multiline>
                      {homepage.header.title.map((t, i) =>
                        t.em ? (
                          <span css={{ color: tokens.accentDefault }} key={i}>
                            {t.text}{" "}
                          </span>
                        ) : (
                          <span key={i}>{t.text} </span>
                        )
                      )}
                    </Text>
                    <Text variant="headerBig" css={{ fontSize: 72 }}>
                      <span css={{ color: tokens.accentDefault }}>
                        {homepage.header.subtitle}
                      </span>
                    </Text>
                  </div>

                  <Text multiline color="dimmer">
                    {homepage.header.description}
                  </Text>
                </div>
              </div>

              <div css={[rcss.flex.growAndShrink(1), rcss.flex.basis(0)]} />
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
