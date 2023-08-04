import ScrollSection from "app/components/ScrollSection";
import type { NextPage } from "next";
import useAppState from "app/hooks/useAppState";
import IndexHeader from "app/components/index/Header";
import ShopPreview from "app/components/index/ShopPreview";
import Contacts from "app/components/index/Contacts";

const Home: NextPage = () => {
  const { isMobile } = useAppState();

  return (
    <>
      <ScrollSection height={isMobile ? "150vh" : "300vh"}>
        {(p) => <IndexHeader percentage={p} />}
      </ScrollSection>
      <ScrollSection height={isMobile ? "auto" : "300vh"} stick={!isMobile}>
        {(p) => <ShopPreview percentage={p} />}
      </ScrollSection>
      <ScrollSection height={isMobile ? "auto" : "200vh"} stick={!isMobile}>
        {(p) => <Contacts percentage={p} />}
      </ScrollSection>
    </>
  );
};

export default Home;
