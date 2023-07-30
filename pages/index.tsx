import ScrollSection from "app/components/ScrollSection";
import type { NextPage } from "next";
import useAppState from "app/hooks/useAppState";
import IndexHeader from "app/components/index/Header";
import { rcss, tokens } from "app/tokens";

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
            <div
              css={[
                rcss.flex.column,
                rcss.center,
                rcss.flex.grow(1),
                {
                  background: tokens.backgroundHigher,
                },
              ]}
            >
              <h1>To be continued</h1>
            </div>
          )}
        </ScrollSection>
      </div>
    </>
  );
};

export default Home;
