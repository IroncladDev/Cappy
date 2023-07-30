import ScrollSection from "app/components/ScrollSection";
import type { NextPage } from "next";
import useAppState from "app/hooks/useAppState";
import IndexHeader from "app/components/index/Header";

const Home: NextPage = () => {
  const { isMobile } = useAppState();

  return (
    <>
      <div>
        <ScrollSection height={isMobile ? "200vh" : "300vh"}>
          {(p) => <IndexHeader percentage={p} />}
        </ScrollSection>
        <ScrollSection height={isMobile ? "200vh" : "300vh"}>
          {(p) => (
            <div>
              <h1>Oh hi</h1>
            </div>
          )}
        </ScrollSection>
      </div>
    </>
  );
};

export default Home;
