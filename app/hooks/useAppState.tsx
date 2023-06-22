import { AppContext, scrollYAtom } from "app/state";
import { useAtom } from "jotai";
import { useContext } from "react";

export default function useAppState() {
  const state = useContext(AppContext);
  const [scrollY] = useAtom(scrollYAtom);

  if (state === null) {
    throw new Error("useAppState must be used within AppContext.Provider");
  }

  return {
    ...state,
    scrollY,
  };
}
