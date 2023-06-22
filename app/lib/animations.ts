import { AnimationProps, Transition } from "framer-motion";

export const op = (opacity: number) => ({ opacity });
export const x = (x: number | string) => ({ x });
export const y = (y: number | string) => ({ y });
export const scale = (scale: number) => ({ scale });
export const rotate = (rotate: number) => ({ rotate });
export const transition = (options: Transition) => ({ transition: options });
export const clip = (path: string | "full") => ({
  clipPath: path === "full" ? "polygon(0 100%, 100% 100%, 100% 0, 0 0)" : path,
});

export type Initial = AnimationProps["initial"];
export type Animate = AnimationProps["animate"];

export function merge<T = AnimationProps["animate"]>(
  animations: Array<Record<string, any>>
) {
  return Object.assign({}, ...animations) as T;
}
