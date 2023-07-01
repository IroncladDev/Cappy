import ScrollSection from "app/components/ScrollSection";
import type { NextPage } from "next";
import useAppState from "app/hooks/useAppState";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { rcss, tokens } from "app/tokens";
import { useAtom } from "jotai";
import { seenIntroAtom } from "app/state";
import IntroScreen from "app/components/IntroScreen";
import Text from "app/components/Text";

const styles = {
  introContainer: [
    rcss.flex.column,
    rcss.position.fixed,
    rcss.width("100vw"),
    rcss.height("100vh"),
    rcss.center,
    {
      backgroundImage: `radial-gradient(
        ellipse farthest-corner at 80% 20%,
        ${tokens.backgroundHigher} 0%,
        ${tokens.backgroundDefault} 30%,
        ${tokens.backgroundRoot} 100%
      )`,
    },
  ],
};

function Test({ percentage }: { percentage: MotionValue<number> }) {
  const spring = useSpring(percentage, {
    mass: 0.05,
  });
  const width = useTransform(spring, (w) => `${w * 100}vw`);

  return (
    <div css={[rcss.flex.grow(1), rcss.flex.column, rcss.center]}>
      <Text variant="headerBig">To be Continued</Text>
    </div>
  );
}

const Home: NextPage = () => {
  const { isMobile } = useAppState();
  const [seenIntro] = useAtom(seenIntroAtom);

  return (
    <>
      <div>
        <ScrollSection
          height={isMobile ? "400vh" : "600vh"}
          stick={!isMobile}
        >
          {(percentage) => <Test percentage={percentage} />}
        </ScrollSection>
        <ScrollSection height={isMobile ? "100vh" : "150vh"} id="about">
          {() => <div>ASDF</div>}
        </ScrollSection>
      </div>
      <IntroScreen isVisible={!seenIntro} />
    </>
  );
};

export default Home;
