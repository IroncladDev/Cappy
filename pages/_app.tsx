import "../styles/globals.css";
import { AppProps } from "next/app";
import { SSRProvider } from "@react-aria/ssr";
import { useEffect, useState } from "react";
import { AppContext } from "app/state";
import HeadMetadata from "app/components/HeadMetadata";
import { useMotionValue } from "framer-motion";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  const windowWidth = useMotionValue(0);
  const windowHeight = useMotionValue(0);

  useEffect(() => {
    const handler = () => {
      windowWidth.set(window.innerWidth);
      windowHeight.set(window.innerHeight);
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handler();

    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <SSRProvider>
      <SessionProvider>
        <AppContext.Provider
          value={{
            isMobile,
            windowWidth,
            windowHeight,
          }}
        >
          <HeadMetadata />
          <Component {...pageProps} />
        </AppContext.Provider>
      </SessionProvider>
    </SSRProvider>
  );
}

export default MyApp;
