import { useContext } from "react";
import { SchemeContext } from "app/components/Scheme";
import { baseTokens } from "app/tokens";

export default function useTokens(colorSchemeOverride?: "dark" | "light") {
  const scheme = colorSchemeOverride || useContext(SchemeContext);

  if (scheme === "dark") {
    return {
      ...baseTokens,
      backgroundRoot: `var(--dark-0)`,
      backgroundDefault: `var(--dark-1)`,
      backgroundHigher: `var(--dark-2)`,
      backgroundHighest: `var(--dark-3)`,

      foregroundDefault: `var(--light-0)`,
      foregroundDimmer: `var(--light-3)`,
      foregroundDimmest: `var(--light-4)`,
    };
  } else {
    return {
      ...baseTokens,
      backgroundRoot: `var(--light-0)`,
      backgroundDefault: `var(--light-1)`,
      backgroundHigher: `var(--light-2)`,
      backgroundHighest: `var(--light-3)`,

      foregroundDefault: `var(--dark-0)`,
      foregroundDimmer: `var(--dark-2)`,
      foregroundDimmest: `var(--dark-3)`,
    };
  }
}
