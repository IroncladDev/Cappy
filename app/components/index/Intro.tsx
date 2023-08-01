import { homepage } from "app/config";
import useAppState from "app/hooks/useAppState";
import { rcss, tokens } from "app/tokens";
import { MotionValue, useSpring, useTransform } from "framer-motion";
import Text from "../Text";
import Button from "../ui/Button";
import { motion } from "framer-motion";
import { pOffset } from "app/lib/algs";
import { Mail, Twitter } from "react-feather";

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
  const { isMobile } = useAppState();

  const pc = useSpring(percentage, {
    mass: 0.05,
  });

  const p = useTransform(pc, (v) =>
    pOffset(v, 0.75, {
      frac: 0.15,
    })
  );

  const preScale = useTransform(p, [0, 1], [0.75, 1]);
  const translateX = useTransform(preScale, (v) => `${-(1 - v) * 100}%`);
  const titleX = useTransform(preScale, (v) => `${100 - v * 100}%`);

  return (
    <div
      css={[rcss.grid.stackElement, rcss.flex.column, rcss.p(16), rcss.center]}
    >
      <div
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
      >
        <div css={[rcss.flex.column, rcss.colWithGap(8)]}>
          <motion.img
            src="/logo/400-round.webp"
            width="240"
            height="240"
            css={{
              maxWidth: "80vw",
              maxHeight: "80vw",
              border: `solid 2px ${tokens.outlineDimmest}`,
              borderRadius: "50%",
            }}
            style={{
              translateX,
              opacity: preScale,
              scale: preScale,
            }}
          />

          <div css={[rcss.flex.column, rcss.colWithGap(8), rcss.center]}>
            <Button
              text="Subscribe to my Newsletter"
              iconLeft={<Mail color={tokens.foregroundDefault} />}
              href="/newsletter"
              style={{
                scale: preScale,
              }}
            />
            <Button
              text="Follow me on X / Twitter"
              iconLeft={<Twitter color={tokens.foregroundDefault} />}
              href="https://twitter.com/LibertyCappy"
              style={{
                scale: preScale,
              }}
            />
          </div>
        </div>

        <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.maxWidth(480)]}>
          <Text
            variant="headerDefault"
            style={{ translateX: titleX, opacity: preScale }}
          >
            {homepage.intro.title}
          </Text>
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
      </div>
    </div>
  );
}