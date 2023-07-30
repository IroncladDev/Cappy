import { constrain } from "app/lib/algs";
import {
  MotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  motion,
  useMotionValue,
} from "framer-motion";
import { useEffect, useRef } from "react";

export default function Canvas({
  percentage,
  onFlash,
}: {
  percentage: MotionValue<number>;
  onFlash: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gunTopRef = useRef<HTMLImageElement>(null);
  const gunBottomRef = useRef<HTMLImageElement>(null);

  const pastPercentage = useMotionValue(0);

  const smoothPercentage = useSpring(percentage, {
    mass: 0.25,
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
        const p2 = constrain((p - 0.5) * 2, 0, 0.5) * 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
          gunBottomRef.current,
          100 - constrain(Math.sin(p2 * 5) * 25, 0, 25),
          0
        );
        ctx.drawImage(
          gunTopRef.current,
          100 - constrain(Math.sin(p2 * 5) * 75, 0, 75),
          0
        );

        if (
          (pastPercentage.get() < 0.625 && p > 0.625) ||
          (pastPercentage.get() > 0.625 && p < 0.625)
        ) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 255; // red
            data[i + 1] = 255; // green
            data[i + 2] = 255; // blue
          }
          ctx.putImageData(imageData, 0, 0);
          onFlash();
        }

        pastPercentage.set(p);
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
