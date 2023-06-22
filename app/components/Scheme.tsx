import useTokens from "app/hooks/useTokens";
import { createContext } from "react";
import { HTMLMotionProps, motion } from "framer-motion";

export const SchemeContext = createContext<"dark" | "light">("dark");

function ThemedMotionDiv(props: HTMLMotionProps<"div">) {
  const tokens = useTokens();

  return (
    <motion.div
      css={{
        background: tokens.backgroundRoot,
        color: tokens.foregroundDefault,
      }}
      {...props}
    />
  );
}

function ThemedDiv(props: React.HTMLProps<HTMLDivElement>) {
  const tokens = useTokens();

  return (
    <div
      css={{
        background: tokens.backgroundRoot,
        color: tokens.foregroundDefault,
      }}
      {...props}
    />
  );
}

export function Scheme({
  scheme = "dark",
  ...props
}: {
  scheme?: "dark" | "light";
} & React.HTMLProps<HTMLDivElement>) {
  return (
    <SchemeContext.Provider value={scheme}>
      <ThemedDiv {...props} />
    </SchemeContext.Provider>
  );
}

export function MotionScheme({
  scheme = "dark",
  ...props
}: {
  scheme: "dark" | "light";
} & HTMLMotionProps<"div">) {
  return (
    <SchemeContext.Provider value={scheme}>
      <ThemedMotionDiv {...props} />
    </SchemeContext.Provider>
  );
}
