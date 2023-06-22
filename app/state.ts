import { MotionValue } from "framer-motion";
import { atom } from "jotai";
import { createContext } from "react";

export const AppContext = createContext<AppState | null>(null);
export const scrollYAtom = atom(0);

export interface AppState {
  isMobile: boolean;
  windowWidth: MotionValue<number>;
  windowHeight: MotionValue<number>;
}
