import { rcss, tokens } from "app/tokens";
import {
  AnimatePresence,
  AnimationScope,
  motion,
  useAnimate,
} from "framer-motion";
import { useEffect, useState } from "react";
import Text from "../Text";
import Button from "./Button";
import Revolver from "app/icons/Revolver";
import Syringe from "app/icons/Syringe";
import Animation from "./Animation";
import { intro } from "app/config";

const styles = {
  container: [
    rcss.flex.column,
    rcss.position.fixed,
    rcss.width("100vw"),
    rcss.height("100vh"),
    rcss.top(0),
    rcss.left(0),
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
  prompt: [
    rcss.flex.column,
    rcss.p(16),
    rcss.colWithGap(8),
    rcss.align.center,
    rcss.maxWidth(480),
    rcss.height("100vh"),
    rcss.maxHeight(360),
    rcss.justify.spaceBetween,
  ],
};

function Prompt({
  choice,
  setChoice,
}: {
  choice: "based" | "leftist" | null;
  setChoice: React.Dispatch<React.SetStateAction<"based" | "leftist" | null>>;
}) {
  const [scope, animate] = useAnimate();
  const [text, animateText] = useAnimate();
  const [header, animateHeader] = useAnimate();
  const [buttons, animateButtons] = useAnimate();

  const animateStrike = async () => {
    if (!scope.current) return;

    await animate(
      scope.current,
      {
        transform: "translatex(-10vw)",
      },
      {
        duration: 0.5,
        ease: "easeIn",
      }
    );
    await animate(
      scope.current,
      {
        transform: "translatex(-15vw)",
      },
      {
        duration: 1.25,
        ease: "easeOut",
      }
    );
    await animate(
      scope.current,
      {
        transform: "translatex(0vw)",
      },
      {
        duration: 0.25,
        ease: "easeOut",
      }
    );
  };
  const animateSpringRebound = async (
    scope: AnimationScope<any>,
    cb: ReturnType<typeof useAnimate>[1],
    d1: number,
    d2: number
  ) => {
    if (!scope.current) return;

    await cb(
      scope.current,
      {
        transform: "translatex(-" + d1 + "px)",
      },
      {
        duration: 0.25,
        ease: "easeIn",
      }
    );
    await cb(
      scope.current,
      {
        transform: "translatex(-" + d2 + "px)",
      },
      {
        duration: 1.5,
        ease: "easeOut",
      }
    );
    await cb(
      scope.current,
      {
        transform: "translatex(0vw)",
      },
      {
        duration: 0.25,
        ease: "easeOut",
      }
    );
  };

  useEffect(() => {
    if (choice) {
      animateStrike();
      animateSpringRebound(header, animateHeader, 50, 65);
      animateSpringRebound(text, animateText, 75, 100);
      animateSpringRebound(buttons, animateButtons, 35, 45);
    }
  }, [choice]);

  return (
    <motion.div css={styles.prompt} ref={scope}>
      <Text variant="headerDefault" innerRef={header}>
        {intro.header}
      </Text>
      <Text
        multiline
        color="dimmer"
        css={{ textAlign: "center" }}
        innerRef={text}
      >
        {intro.description}
      </Text>

      <motion.div
        css={[
          rcss.flex.row,
          rcss.justify.center,
          {
            flexWrap: "wrap",
            gap: 8,
          },
        ]}
        ref={buttons}
      >
        <Button onClick={() => setChoice("leftist")}>
          <Syringe
            width={36}
            height={36}
            color={tokens.foregroundDimmer}
            css={{
              transform: "rotate(180deg)",
              padding: 4,
            }}
          />
          <Text variant="subheadDefault">{intro.optionLeft}</Text>
        </Button>
        <Button onClick={() => setChoice("based")}>
          <Revolver
            width={36}
            height={36}
            color={tokens.foregroundDimmer}
            css={{
              transform: "rotate(-45deg)",
            }}
          />
          <Text variant="subheadDefault">{intro.optionRight}</Text>
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function IntroScreen({ isVisible }: { isVisible: boolean }) {
  const [choice, setChoice] = useState<"based" | "leftist" | null>(null);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={styles.container}
          initial={{
            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
          }}
          exit={{
            clipPath: `polygon(0 0, 0% 0, 0% 100%, 0 100%)`,
          }}
        >
          <Prompt setChoice={setChoice} choice={choice} />
          {choice ? <Animation choice={choice} /> : null}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
