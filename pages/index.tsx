import ScrollSection from "app/components/ScrollSection";
import type { NextPage } from "next";
import useTokens from "app/hooks/useTokens";
import useAppState from "app/hooks/useAppState";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { rcss } from "app/tokens";

function Test({
  percentage
}: {
  percentage: MotionValue<number>;
}) {
  const spring = useSpring(percentage, {
    mass: 0.05
  });
  const width = useTransform(spring, w => `${w * 100}vw`)

  return <div css={[rcss.flex.grow(1), rcss.flex.column, {
    background: 'rgb(250, 240, 230)'
  }, rcss.align.start]}>
    <motion.div
      css={{
        background: 'red',
        height: 16
      }}
      style={{
        width
      }}
    >
    </motion.div>

    aaaaaa
  </div>
}

const Home: NextPage = () => {
  const { isMobile } = useAppState();
  const tokens = useTokens();

  return (
    <div>
      <ScrollSection height={isMobile ? "400vh" : "600vh"} stick={!isMobile}>
        {(percentage) => <Test percentage={percentage} />}
      </ScrollSection>
      <ScrollSection height={isMobile ? "100vh" : "150vh"} id="about">
        {() => <div>ASDF</div>}
      </ScrollSection>
    </div>
  );
};

export default Home;
