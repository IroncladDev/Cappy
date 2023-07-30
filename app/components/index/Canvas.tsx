import { constrain } from "app/lib/algs";
import {
  MotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Canvas({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gunTopRef = useRef<HTMLImageElement>(null);
  const gunBottomRef = useRef<HTMLImageElement>(null);

  const smoothPercentage = useSpring(percentage, {
    mass: 0.05,
  });
  const translateX = useTransform(smoothPercentage, (v) => {
    const p1 = constrain(v * 2, 0, 1);
    return `calc(${15 * p1}vw - 100px)`;
  });
  const translateY = useTransform(smoothPercentage, (v) => {
    const p1 = constrain(v * 2, 0, 1);
    return `calc(${150 - 100 * p1}vh - 25%)`;
  });

  const rotate = useTransform(smoothPercentage, (v) => {
    const p1 = constrain(v * 2, 0, 1);
    const p2 = constrain((v - 0.5) * 2, 0, 0.5) * 2;

    if (p2 > 0) {
      return `${-constrain(Math.sin(p2 * 5) * 5, 0, 5)}deg`;
    }

    return `${90 - p1 * 90}deg`;
  });

  const handleMotionValueChange = (p: number) => {
    if (canvasRef.current && gunTopRef.current && gunBottomRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const p1 = constrain(p * 2, 0, 1);
        const p2 = constrain((p - 0.5) * 2, 0, 0.5) * 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(gunBottomRef.current, 100, 0);
        ctx.drawImage(
          gunTopRef.current,
          100 - constrain(Math.sin(p2 * 5) * 50, 0, 50),
          0
        );
      }
    }
  };

  useEffect(() => {
    handleMotionValueChange(0);
  }, [canvasRef, gunBottomRef, gunTopRef]);

  useMotionValueEvent(smoothPercentage, "change", handleMotionValueChange);

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        css={{
          width: "100vw",
          maxWidth: 600,
          maxHeight: 350,
          transformOrigin: "100px center",
          transition: "0.25s ease-out",
        }}
        width="600"
        height="350"
        style={{
          rotate,
          translateX,
          translateY,
        }}
      ></motion.canvas>
      <img
        ref={gunTopRef}
        src="/images/pistol-slider.png"
        alt="Pistol Slider"
        style={{ display: "none" }}
      />
      <img
        ref={gunBottomRef}
        src="/images/pistol-handle.png"
        alt="Pistol Handle"
        style={{ display: "none" }}
      />
    </>
  );
}
