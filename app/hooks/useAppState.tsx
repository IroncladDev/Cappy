import { AppContext } from "app/state";
import { useContext } from "react";

export default function useAppState() {
  const state = useContext(AppContext);

  if (state === null) {
    throw new Error("useAppState must be used within AppContext.Provider");
  }

  return {
    ...state,
  };
}
