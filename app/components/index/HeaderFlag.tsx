import { constrain } from "app/lib/algs";
import { tokens } from "app/tokens";
import {
  MotionValue,
  motion,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";

function Star({
  percentage,
  index,
  transform,
  d,
}: {
  percentage: MotionValue<number>;
  index: number;
  d: string;
  transform: string;
}) {
  const fill = useTransform(percentage, (v) => {
    let val = index / 16;

    return v <= val ? tokens.backgroundRoot : tokens.accentDefault;
  });

  return (
    <motion.path
      d={d}
      transform={transform}
      style={{
        fill,
        transition: "0.25s linear",
      }}
    />
  );
}

function Stripe({
  percentage,
  index,
  d,
  children,
}: {
  percentage: MotionValue<number>;
  index: number;
  d: string;
  children?: React.ReactNode;
}) {
  const velocity = useVelocity(percentage);
  const smoothVelocity = useSpring(velocity, {
    mass: 0.05,
    stiffness: 5000,
    damping: 200 * (index + 1),
  });
  const transform = useTransform(smoothVelocity, (v) => {
    return `translateX(${constrain(Math.abs(v * 10), 0, (7 - index) * 10)}px)`;
  });

  return (
    <motion.path
      fill={index % 2 === 0 ? "url(#stripe-even)" : "url(#stripe-odd)"}
      stroke={tokens.outlineDimmer}
      d={d}
      style={{
        transform,
        transition: "0.25s ease-out",
        strokeWidth: 2,
        pathLength: percentage,
      }}
      children={children}
    />
  );
}

export default function HeaderFlag({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  const smoothPercentage = useSpring(percentage, {
    mass: 0.1,
  });

  return (
    <motion.svg
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
      css={{
        position: "absolute",
        bottom: 0,
        right: 0,
        maxHeight: "100vh",
        transition: "0.25s ease-out",
      }}
    >
      <defs>
        <linearGradient id="stripe-even" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={tokens.backgroundRoot} />
          <stop offset="100%" stopColor={tokens.backgroundHigher} />
        </linearGradient>
        <linearGradient id="stripe-odd" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={tokens.backgroundDefault} />
          <stop offset="100%" stopColor={tokens.backgroundHighest} />
        </linearGradient>
      </defs>
      <Stripe
        index={5}
        percentage={smoothPercentage}
        d="M 0 500 C 0 416.667 500 83.333 500 0 L 500 83.333 C 500 166.667 83.333 416.667 83.333 500 L 0 500 Z"
      ></Stripe>
      <Stripe
        index={4}
        percentage={smoothPercentage}
        d="M 83.333 500 C 83.333 416.667 500 166.667 500 83.333 L 500 166.667 C 500 250 166.667 416.667 166.667 500 L 83.333 500 Z"
      ></Stripe>
      <Stripe
        index={3}
        percentage={smoothPercentage}
        d="M 166.667 500 C 166.667 416.667 500 250 500 166.667 L 500 250 C 500 333.333 250 416.667 250 500 L 166.667 500 Z"
      ></Stripe>
      <Stripe
        index={2}
        percentage={smoothPercentage}
        d="M 250 500 C 250 416.667 500 333.333 500 250 L 500 333.333 C 499.5 416.667 333.333 416.667 333.333 500 L 250 500 Z"
      ></Stripe>
      <Stripe
        index={1}
        percentage={smoothPercentage}
        d="M 333.333 500 C 333.333 416.667 500 416.667 500 333.333 L 500 416.667 C 500 458.333 416.667 458.333 416.667 500 L 333.333 500 Z"
      ></Stripe>
      <Stripe
        index={0}
        percentage={smoothPercentage}
        d="M 500 500 C 500 500 500 500 416.667 500 C 416.667 458.333 500 458.333 500 416.667 C 500 458.333 500 458.333 500 500 Z"
      ></Stripe>

      <Stripe
        index={6}
        percentage={smoothPercentage}
        d="M 0 500 C 0 450 134.992 347.115 134.968 347.163 L 250 500 L 0 500 Z"
      ></Stripe>

      <Star
        d="M 162.5 200 L 165.59 209.348 L 175 209.549 L 167.5 215.528 L 170.225 225.001 L 162.5 219.348 L 154.775 225.001 L 157.5 215.528 L 150 209.549 L 159.41 209.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -10.459495, 745.726967)"
        percentage={percentage}
        index={0}
      ></Star>
      <Star
        d="M 112.5 250 L 115.59 259.348 L 125 259.549 L 117.5 265.528 L 120.225 275.001 L 112.5 269.348 L 104.775 275.001 L 107.5 265.528 L 100 259.549 L 109.41 259.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330066, 742.282203)"
        percentage={percentage}
        index={1}
      ></Star>
      <Star
        d="M 162.5 250 L 165.59 259.348 L 175 259.549 L 167.5 265.528 L 170.225 275.001 L 162.5 269.348 L 154.775 275.001 L 157.5 265.528 L 150 259.549 L 159.41 259.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330069, 742.282208)"
        percentage={percentage}
        index={2}
      ></Star>
      <Star
        d="M 62.5 300 L 65.59 309.348 L 75 309.549 L 67.5 315.528 L 70.225 325.001 L 62.5 319.348 L 54.775 325.001 L 57.5 315.528 L 50 309.549 L 59.41 309.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330028, 742.282141)"
        percentage={percentage}
        index={3}
      ></Star>
      <Star
        d="M 112.5 300 L 115.59 309.348 L 125 309.549 L 117.5 315.528 L 120.225 325.001 L 112.5 319.348 L 104.775 325.001 L 107.5 315.528 L 100 309.549 L 109.41 309.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330023, 742.282207)"
        percentage={percentage}
        index={4}
      ></Star>
      <Star
        d="M 162.5 300 L 165.59 309.348 L 175 309.549 L 167.5 315.528 L 170.225 325.001 L 162.5 319.348 L 154.775 325.001 L 157.5 315.528 L 150 309.549 L 159.41 309.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330055, 742.282274)"
        percentage={percentage}
        index={5}
      ></Star>
      <Star
        d="M 187.5 175 L 190.59 184.348 L 200 184.549 L 192.5 190.528 L 195.225 200.001 L 187.5 194.348 L 179.775 200.001 L 182.5 190.528 L 175 184.549 L 184.41 184.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -6.153585, 749.458779)"
        percentage={percentage}
        index={6}
      ></Star>
      <Star
        d="M 137.5 225 L 140.59 234.348 L 150 234.549 L 142.5 240.528 L 145.225 250.001 L 137.5 244.348 L 129.775 250.001 L 132.5 240.528 L 125 234.549 L 134.41 234.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330074, 742.282203)"
        percentage={percentage}
        index={7}
      ></Star>
      <Star
        d="M 187.5 225 L 190.59 234.348 L 200 234.549 L 192.5 240.528 L 195.225 250.001 L 187.5 244.348 L 179.775 250.001 L 182.5 240.528 L 175 234.549 L 184.41 234.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -10.459489, 745.727033)"
        percentage={percentage}
        index={8}
      ></Star>
      <Star
        d="M 87.5 275 L 90.59 284.348 L 100 284.549 L 92.5 290.528 L 95.225 300.001 L 87.5 294.348 L 79.775 300.001 L 82.5 290.528 L 75 284.549 L 84.41 284.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330033, 742.282141)"
        percentage={percentage}
        index={9}
      ></Star>
      <Star
        d="M 137.5 275 L 140.59 284.348 L 150 284.549 L 142.5 290.528 L 145.225 300.001 L 137.5 294.348 L 129.775 300.001 L 132.5 290.528 L 125 284.549 L 134.41 284.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330064, 742.282208)"
        percentage={percentage}
        index={10}
      ></Star>
      <Star
        d="M 187.5 275 L 190.59 284.348 L 200 284.549 L 192.5 290.528 L 195.225 300.001 L 187.5 294.348 L 179.775 300.001 L 182.5 290.528 L 175 284.549 L 184.41 284.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330059, 742.282214)"
        percentage={percentage}
        index={11}
      ></Star>
      <Star
        d="M 37.5 325 L 40.59 334.348 L 50 334.549 L 42.5 340.528 L 45.225 350.001 L 37.5 344.348 L 29.775 350.001 L 32.5 340.528 L 25 334.549 L 34.41 334.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.329981, 742.28214)"
        percentage={percentage}
        index={12}
      ></Star>
      <Star
        d="M 87.5 325 L 90.59 334.348 L 100 334.549 L 92.5 340.528 L 95.225 350.001 L 87.5 344.348 L 79.775 350.001 L 82.5 340.528 L 75 334.549 L 84.41 334.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330013, 742.282146)"
        percentage={percentage}
        index={13}
      ></Star>
      <Star
        d="M 137.5 325 L 140.59 334.348 L 150 334.549 L 142.5 340.528 L 145.225 350.001 L 137.5 344.348 L 129.775 350.001 L 132.5 340.528 L 125 334.549 L 134.41 334.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330011, 742.282213)"
        percentage={percentage}
        index={14}
      ></Star>
      <Star
        d="M 187.5 325 L 190.59 334.348 L 200 334.549 L 192.5 340.528 L 195.225 350.001 L 187.5 344.348 L 179.775 350.001 L 182.5 340.528 L 175 334.549 L 184.41 334.348 Z"
        transform="matrix(-0.627592, -0.778542, 0.778542, -0.627592, -13.330065, 742.282157)"
        percentage={percentage}
        index={15}
      ></Star>
    </motion.svg>
  );
}
