import { MotionValue } from "framer-motion";
import { atomWithStorage } from "jotai/utils";
import { createContext } from "react";

export const AppContext = createContext<AppState | null>(null);
export const seenIntroAtom = atomWithStorage("hasSeenIntro", false);

export interface AppState {
  isMobile: boolean;
  windowWidth: MotionValue<number>;
  windowHeight: MotionValue<number>;
}
