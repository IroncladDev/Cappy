import useAppState from "app/hooks/useAppState";
import Brass from "app/icons/Brass";
import { rcss, tokens } from "app/tokens";
import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
import { Howl } from "howler";
import { useAtom } from "jotai";
import { seenIntroAtom } from "app/state";
import Text from "../Text";

const styles = {
  container: [
    rcss.position.fixed,
    rcss.width("100vw"),
    rcss.height("100vh"),
    rcss.top(0),
    rcss.left(0),
  ],
  shockwave: [
    rcss.position.absolute,
    rcss.left("100vw"),
    {
      borderRadius: "50%",
    },
  ],
  brass: [rcss.position.absolute, rcss.left("150vw")],
  message: [
    rcss.position.absolute,
    rcss.left(0),
    {
      transform: "translatex(-100%)",
    },
  ],
};

export default function Animation({
  choice,
}: {
  choice: "based" | "leftist" | null;
}) {
  const [brass, brassAnimationStep] = useAnimate();
  const [shock, shockAnimationStep] = useAnimate();
  const [header, headerAnimationStep] = useAnimate();
  const { windowWidth, windowHeight, isMobile } = useAppState();

  const [, setHasSeenIntro] = useAtom(seenIntroAtom);

  const animateShockwave = async () => {
    if (!shock.current) return;

    const greater =
      windowWidth.get() > windowHeight.get()
        ? windowWidth.get()
        : windowHeight.get();

    await shockAnimationStep(
      shock.current,
      {
        filter: "blur(4px)",
        backdropFilter: `blur(2px)`,
        border: `solid 50px rgba(255, 255, 255, 0.025)`,
        left: "75vw",
        width: `${greater * 1.5}px`,
        height: `${greater * 1.5}px`,
      },
      {
        ease: "easeIn",
        duration: 0.25,
      }
    );
    await shockAnimationStep(
      shock.current,
      {
        left: "65vw",
        scale: 1.5,
      },
      { ease: "easeInOut", duration: 1.5 }
    );
    await shockAnimationStep(
      shock.current,
      {
        left: "50vw",
        transform: "translatex(-100%)",
        scale: 3,
        filter: "blur(0px)",
        backdropFilter: `blur(0px)`,
        opacity: 0,
      },
      {
        ease: "easeOut",
        duration: 0.25,
      }
    );
    await shockAnimationStep(shock.current, {
      display: "none",
    });
    setHasSeenIntro(true);
  };

  const animateBrass = async () => {
    if (!brass.current) return;

    await brassAnimationStep(
      brass.current,
      { left: "75vw" },
      { ease: "easeIn", duration: 0.25 }
    );
    await brassAnimationStep(
      brass.current,
      { left: "65vw", opacity: 0.5 },
      { ease: "easeInOut", duration: 1.5 }
    );
    await brassAnimationStep(
      brass.current,
      { left: 0, transform: "translatex(-100%)", opacity: 1 },
      { ease: "easeOut", duration: 0.25 }
    );
  };

  const animateHeader = async () => {
    if (!header.current) return;

    await headerAnimationStep(
      header.current,
      { transform: `translateX(0)` },
      { ease: "easeIn", duration: 0.25 }
    );
    await headerAnimationStep(
      header.current,
      { left: "25vw", opacity: 0.5 },
      { ease: "easeInOut", duration: 1.5 }
    );
    await headerAnimationStep(
      header.current,
      { left: "100vw", opacity: 1 },
      { ease: "easeOut", duration: 0.25 }
    );
  };

  useEffect(() => {
    animateBrass();
    animateShockwave();
    animateHeader();

    const whoosh = new Howl({
      src: ["/sounds/whoosh.mp3"],
      volume: 0.5,
    });

    const strike = new Howl({
      src: ["/sounds/drop.mp3"],
      volume: 0.5,
    });

    whoosh.play();

    setTimeout(() => strike.play(), 250);
  }, []);

  return (
    <>
      <motion.div css={styles.shockwave} ref={shock}></motion.div>
      <motion.div css={styles.brass} ref={brass}>
        <Brass width="200" color={tokens.accentDefault} />
      </motion.div>
      <motion.div css={styles.message} ref={header}>
        <Text variant="headerBig" css={isMobile ? undefined : { fontSize: 72 }}>
          {choice === "based" ? "BASED" : "Brace Yourself"}
        </Text>
      </motion.div>
    </>
  );
}
