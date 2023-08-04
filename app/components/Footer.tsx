import { footer } from "app/config";
import { rcss, tokens } from "app/tokens";
import Link from "next/link";
import { Mail, Twitter } from "react-feather";
import Button from "./ui/Button";
import Text from "./Text";
import useAppState from "app/hooks/useAppState";

const styles = {
  footer: [
    rcss.px(16),
    rcss.py(64),
    rcss.flex.column,
    rcss.center,
    {
      background: `radial-gradient(circle at 50% 100%, ${tokens.backgroundHighest}, ${tokens.backgroundRoot})`,
      borderTop: `solid 2px ${tokens.backgroundHigher}`,
    },
  ],
  footerContentWrapper: [
    rcss.flex.column,
    rcss.colWithGap(16),
    rcss.maxWidth(720),
    rcss.width("100%"),
  ],
  footerMeta: (isMobile: boolean) => [
    rcss.flex.column,
    rcss.colWithGap(8),
    rcss.flex.grow(1),
    isMobile ? undefined : rcss.maxWidth(240),
    isMobile ? rcss.align.center : undefined,
    isMobile ? rcss.width("100%") : 0,
  ],
  ctaButtonWrapper: [
    rcss.flex.row,
    rcss.rowWithGap(8),
    {
      "& > a": {
        flexGrow: 1,
        display: "flex",
      },
    },
  ],
  footerLinksContainer: (isMobile: boolean) => [
    rcss.flex.row,
    rcss.rowWithGap(32),
    rcss.flex.grow(2),
    isMobile ? rcss.justify.center : rcss.justify.end,
  ],
  footerWebLinks: (isMobile: boolean) => [
    rcss.flex.column,
    rcss.colWithGap(8),
    isMobile ? rcss.align.start : rcss.align.center,
  ],
  footerEnd: (isMobile: boolean) => [
    rcss.py(16),
    rcss.justify.spaceBetween,
    isMobile ? undefined : rcss.width("100%"),
    isMobile ? rcss.flex.column : rcss.flex.row,
    isMobile ? rcss.colWithGap(16) : rcss.rowWithGap(16),
    isMobile ? rcss.align.center : undefined,
    {
      borderTop: `solid 1px ${tokens.outlineDimmest}`,
      alignSelf: isMobile ? "center" : undefined,
    },
  ]
}

export default function Footer() {
  const { isMobile } = useAppState();

  return (
    <footer
      css={styles.footer}
    >
      <div
        css={styles.footerContentWrapper}
      >
        <div
          css={
            isMobile
              ? [rcss.flex.column, rcss.colWithGap(32)]
              : [rcss.flex.row, rcss.rowWithGap(16)]
          }
        >
          <div
            css={styles.footerMeta(isMobile)}
          >
            <Text variant="subheadDefault">{footer.header}</Text>
            <Text color="dimmer" multiline>
              {footer.description}
            </Text>

            {isMobile ? null : <div css={rcss.flex.grow(1)} />}

            <div
              css={styles.ctaButtonWrapper}
            >
              <Button
                text="Subscribe"
                level={2}
                iconLeft={<Mail color={tokens.foregroundDefault} size={16} />}
                href="/newsletter"
                css={rcss.flex.grow(1)}
              />
              <Button
                text="Follow"
                level={2}
                iconLeft={
                  <Twitter color={tokens.foregroundDefault} size={16} />
                }
                href="https://twitter.com/LibertyCappy"
                css={rcss.flex.grow(1)}
              />
            </div>
          </div>

          <div
            css={styles.footerLinksContainer(isMobile)}
          >
            <div
              css={styles.footerWebLinks(isMobile)}
            >
              {footer.siteLinks.map(([title, url], i) => (
                <Link key={i} href={url} passHref>
                  <a>
                    <Text css={{ textDecoration: "underline" }}>{title}</Text>
                  </a>
                </Link>
              ))}
            </div>

            <div css={[rcss.flex.column, rcss.colWithGap(8), rcss.align.end]}>
              {footer.socialLinks.map(([title, url], i) => (
                <Link key={i} href={url} passHref>
                  <a>
                    <Text css={{ textDecoration: "underline" }}>{title}</Text>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div
          css={styles.footerEnd(isMobile)}
        >
          <Text color="dimmer">
            &copy; Declaration of Memes{" "}
            {new Date().getFullYear() === 2023
              ? 2023
              : `${2023} - ${new Date().getFullYear()}`}
          </Text>

          <div css={[rcss.flex.row, rcss.rowWithGap(8)]}>
            <a href="https://connerow.dev" target="_blank" rel="noreferrer">
              <Text color="dimmest">Design & Development by IroncladDev</Text>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
