import "../styles/globals.css";
import { AppProps } from "next/app";
import { SSRProvider } from "@react-aria/ssr";
import { useEffect, useState } from "react";
import { AppContext } from "app/state";
import HeadMetadata from "app/components/HeadMetadata";
import { useRouter } from "next/router";
import NavHeader from "app/components/NavHeader";

function MyApp({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const handler = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    handler();

    window.addEventListener("resize", handler);
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
        }}
      >
        <HeadMetadata />
        <Component {...pageProps} />
        <NavHeader />
      </AppContext.Provider>
    </SSRProvider>
  );
}

export default MyApp;
