import "../styles/globals.css";
import { AppProps } from "next/app";
import { SSRProvider } from "@react-aria/ssr";
import { useEffect, useState } from "react";
import { AppContext } from "app/state";
import HeadMetadata from "app/components/HeadMetadata";
import { useMotionValue } from "framer-motion";
import Nav from "app/components/Nav";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

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

  useEffect(() => {
    if (router.asPath === "/#about") {
      window.scrollTo(
        0,
        window.innerHeight * (isMobile ? 1.5 : 3) - window.innerHeight
      );
    }
  }, [router.asPath, isMobile]);

  return (
    <SSRProvider>
      <AppContext.Provider
        value={{
          isMobile,
          windowWidth,
          windowHeight,
        }}
      >
        <HeadMetadata />
        <Component {...pageProps} />
        <Nav />
      </AppContext.Provider>
    </SSRProvider>
  );
}

export default MyApp;
