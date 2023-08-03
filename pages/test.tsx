import ScrollSection from "app/components/ScrollSection";
import useAppState from "app/hooks/useAppState";
import { NextPage } from "next";

const Home: NextPage = () => {
  const { isMobile } = useAppState();

  return (
    <>
      <div>
        <ScrollSection height="500vh">{() => <div>asdf</div>}</ScrollSection>
      </div>
    </>
  );
};

export default Home;
