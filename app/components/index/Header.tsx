import { rcss, tokens } from "app/tokens";
import { MotionValue } from "framer-motion";
import HeaderFlag from "./HeaderFlag";
import Text from "../Text";
import Canvas from "./Canvas";

export default function IndexHeader({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  return (
    <div
      css={[
        rcss.flex.grow(1),
        rcss.grid.stack,
        rcss.linearGradient(0, [
          tokens.backgroundRoot,
          tokens.backgroundDefault,
        ]),
      ]}
    >
      <div
        css={[rcss.grid.stackElement, rcss.position.relative, rcss.zIndex(0)]}
      >
        <Canvas percentage={percentage} />
      </div>

      <div
        css={[rcss.grid.stackElement, rcss.position.relative, rcss.zIndex(0)]}
      >
        <HeaderFlag percentage={percentage} />
      </div>

      <div
        css={[
          rcss.grid.stackElement,
          rcss.flex.row,
          rcss.p(16),
          rcss.center,
          rcss.zIndex(1),
        ]}
      >
        <div
          css={[
            rcss.flex.row,
            rcss.maxWidth(tokens.maxBodyWidth),
            rcss.width("100%"),
            rcss.align.center,
          ]}
        >
          <div
            css={[
              rcss.flex.growAndShrink(1),
              rcss.flex.basis(0),
              rcss.p(16),
              rcss.flex.column,
              rcss.align.center,
            ]}
          >
            <div
              css={[rcss.flex.column, rcss.colWithGap(16), rcss.maxWidth(360)]}
            >
              <div css={[rcss.flex.column, rcss.colWithGap(8)]}>
                <Text variant="headerBig">
                  I <span css={{ color: tokens.accentDefault }}>Meme</span> For
                </Text>
                <Text variant="headerBig">
                  <span css={{ color: tokens.accentDefault }}>Freedom</span>
                </Text>
              </div>

              <Text multiline>
                This is a test paragraph that goes asdf asdufhud fsadhf ihsdif
                asudihf uidsah fhdsf
              </Text>
            </div>
          </div>

          <div css={[rcss.flex.growAndShrink(1), rcss.flex.basis(0)]}></div>
        </div>
      </div>
    </div>
  );
}
