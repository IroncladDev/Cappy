import { homepage } from "app/config";
import useAppState from "app/hooks/useAppState";
import { rcss, tokens } from "app/tokens";
import {
  MotionValue,
  useAnimate,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import Text from "../Text";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { pOffset } from "app/lib/algs";
import { Mail, Twitter, Youtube } from "react-feather";

function TransitionParagraph({
  text,
  percentage,
  index,
}: {
  text: string;
  percentage: MotionValue<number>;
  index: number;
}) {
  const translateY = useTransform(
    percentage,
    (v) =>
      `${
        100 -
        pOffset(v, 1 - 1 / index, {
          frac: 1 / index,
        }) *
          100
      }%`
  );

  return (
    <Text color="dimmer" multiline style={{ translateY }}>
      {text}
    </Text>
  );
}

export default function Intro({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  const [scope, animate] = useAnimate();
  const { isMobile } = useAppState();

  const pSmooth = useSpring(percentage, {
    mass: 0.1,
  });

  const p = useTransform(pSmooth, (v) =>
    pOffset(v, 0.75, {
      frac: 0.15,
    })
  );

  const preScale = useTransform(p, [0, 1], [0.75, 1]);
  const translateX = useTransform(preScale, (v) => `${-(1 - v) * 100}%`);
  const titleX = useTransform(preScale, (v) => `${100 - v * 100}%`);

  const flashAnimation = async () => {
    await animate(
      scope.current,
      {
        filter: `drop-shadow(0 0 0px rgba(215, 217, 238, 0.5))`,
      },
      {
        duration: 0,
      }
    );
    await animate(
      scope.current,
      {
        filter: `drop-shadow(0 0 100px rgba(215, 217, 238, 0))`,
      },
      {
        duration: 1,
      }
    );
    await animate(
      scope.current,
      {
        filter: `drop-shadow(0 0 0px rgba(215, 217, 238, 0))`,
      },
      {
        duration: 0,
      }
    );
    await animate(
      scope.current,
      {
        filter: `drop-shadow(0 0 0px rgba(215, 217, 238, 0.5))`,
      },
      {
        duration: 0,
      }
    );
  };

  useMotionValueEvent(p, "change", (v) => {
    if (v === 1) {
      flashAnimation();
    }
  });

  return (
    <div
      css={[rcss.grid.stackElement, rcss.flex.column, rcss.p(16), rcss.center]}
    >
      <motion.div
        css={
          isMobile
            ? [rcss.flex.column, rcss.colWithGap(16), rcss.center]
            : [
                rcss.flex.row,
                rcss.rowWithGap(16),
                rcss.maxWidth(tokens.maxBodyWidth),
                rcss.center,
              ]
        }
        ref={scope}
      >
        <div css={[rcss.flex.column, rcss.colWithGap(8), rcss.align.center]}>
          <motion.img
            src="/logo/400-round.webp"
            width="240"
            height="240"
            css={{
              maxWidth: "30vh",
              maxHeight: "30vh",
              border: `solid 2px ${tokens.outlineDimmest}`,
              borderRadius: "50%",
            }}
            style={{
              translateX,
              opacity: preScale,
              scale: preScale,
            }}
            alt="Logo"
          />

          <div
            css={[
              rcss.flex.row,
              rcss.flex.wrap,
              rcss.center,
              rcss.maxWidth(280),
              {
                gap: 8,
              },
            ]}
          >
            <Button
              text="Subscribe to my Newsletter"
              iconLeft={<Mail color={tokens.foregroundDefault} />}
              href="/newsletter"
              style={{
                background: tokens.accentDimmest,
                color: tokens.foregroundDefault,
                scale: preScale,
              }}
              whileHover={{
                background: tokens.accentDimmer,
                color: tokens.foregroundDefault,
                borderColor: tokens.accentDefault,
              }}
              whileTap={{
                background: tokens.accentDimmer,
                color: tokens.foregroundDefault,
                borderColor: tokens.accentDefault,
              }}
            />

            <Button
              text="X / Twitter"
              iconLeft={<Twitter color={tokens.foregroundDefault} />}
              href="https://twitter.com/LibertyCappy"
              style={{
                scale: preScale,
              }}
            />

            <Button
              text="Youtube"
              iconLeft={<Youtube color={tokens.foregroundDefault} />}
              href="https://www.youtube.com/@libertycappy"
              style={{
                scale: preScale,
              }}
            />
          </div>
        </div>

        <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.maxWidth(480)]}>
          <div css={[rcss.flex.row]}>
            <Text
              variant="headerDefault"
              style={{ translateX: titleX, opacity: preScale }}
            >
              {homepage.intro.title}
            </Text>
          </div>
          <motion.div
            css={[rcss.flex.column, rcss.colWithGap(8)]}
            style={{
              opacity: p,
            }}
          >
            {homepage.intro.paragraphs.map((text, i) => (
              <TransitionParagraph
                text={text}
                key={i}
                index={i}
                percentage={p}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
