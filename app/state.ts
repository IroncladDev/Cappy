import { createContext } from "react";

export const AppContext = createContext<AppState | null>(null);

export interface AppState {
  isMobile: boolean;
}
