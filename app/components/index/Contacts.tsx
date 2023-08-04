import { rcss, tokens } from "app/tokens";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { homepage } from "app/config";
import Text from "../Text";
import Button from "../ui/Button";
import { Facebook, Instagram, Mail } from "react-feather";
import { useEffect, useRef, useState } from "react";
import useAppState from "app/hooks/useAppState";
import { DragIndicator } from "./ShopPreview";

const styles = {
  accountCardContainer: (large: boolean) => [
    rcss.borderRadius(16),
    rcss.p(16),
    rcss.minWidth(360),
    large ? rcss.flex.row : rcss.flex.column,
    large ? rcss.rowWithGap(16) : rcss.colWithGap(16),
    large ? rcss.align.center : null,
    {
      border: `solid 1px ${tokens.backgroundHigher}`,
      flex: "1 1 0",
    },
  ],
  accountCardImage: [
    rcss.borderRadius(16),
    {
      border: `solid 1px ${tokens.backgroundHigher}`,
    },
  ],
  accountCardContentWrapper: [
    rcss.flex.column,
    rcss.colWithGap(8),
    {
      flex: "1 1 0",
      minWidth: 0,
    },
  ],
  smallCardContainer: [rcss.flex.row, rcss.rowWithGap(16), rcss.align.center],
  contactSection: [
    rcss.flex.column,
    rcss.flex.grow(1),
    rcss.center,
    rcss.py(64),
    {
      background: `linear-gradient(0deg, ${tokens.backgroundRoot}, ${tokens.backgroundDefault})`,
      borderTop: `solid 2px ${tokens.backgroundHigher}`,
    },
  ],
  contactMain: (isMobile: boolean) => [
    isMobile ? rcss.flex.column : rcss.flex.row,
    isMobile ? rcss.colWithGap(16) : rcss.rowWithGap(16),
    rcss.p(16),
    rcss.center,
    rcss.maxWidth(tokens.maxBodyWidth),
    rcss.width("100vw"),
  ],
  contactMainInner: (isMobile: boolean) => [
    rcss.flex.column,
    rcss.colWithGap(32),
    isMobile
      ? undefined
      : {
          flex: "1 1 0",
          minWidth: 0,
        },
  ],
  buttonContainer: [
    rcss.flex.row,
    rcss.rowWithGap(16),
    rcss.width("100%"),
    {
      "& a": {
        flexGrow: 1,
        display: "flex",
      },
    },
  ],
  accountsContainer: (isMobile: boolean) => [
    rcss.flex.column,
    rcss.position.relative,
    isMobile ? undefined : rcss.height("100%"),
    rcss.minWidth(0),
    rcss.maxWidth("100vw"),
    isMobile
      ? undefined
      : {
          flex: "1 1 0",
        },
  ],
  accounts: [
    rcss.position.absolute,
    rcss.top(0),
    rcss.left(0),
    rcss.width("100%"),
    rcss.height("100%"),
  ],
};

function AccountCard({
  account,
  large,
}: {
  account: {
    username: string;
    displayName: string;
    bio: string;
    image: string;
    url: string;
  };
  large?: boolean;
}) {
  return (
    <a target="_blank" href={account.url} draggable={false}>
      <motion.div
        css={styles.accountCardContainer(Boolean(large))}
        initial={{
          background: tokens.backgroundRoot,
        }}
        whileHover={{
          background: tokens.backgroundDefault,
        }}
        transition={{
          duration: 0.25,
        }}
      >
        {large ? (
          <>
            <img
              width="128"
              height="128"
              src={account.image}
              css={styles.accountCardImage}
              alt={account.username}
            />

            <div css={styles.accountCardContentWrapper}>
              <Text variant={large ? "subheadBig" : "subheadDefault"} multiline>
                {account.displayName}
              </Text>
              <Text color="dimmest">@{account.username}</Text>

              <Text multiline color="dimmer">
                {account.bio}
              </Text>
            </div>
          </>
        ) : (
          <div css={styles.smallCardContainer}>
            <img
              width="64"
              height="64"
              src={account.image}
              css={styles.accountCardImage}
              alt={account.username}
            />

            <div css={styles.accountCardContentWrapper}>
              <Text variant={large ? "subheadBig" : "subheadDefault"} multiline>
                {account.displayName}
              </Text>
              <Text color="dimmest">@{account.username}</Text>
            </div>
          </div>
        )}

        {large ? null : (
          <Text multiline color="dimmer">
            {account.bio}
          </Text>
        )}
      </motion.div>
    </a>
  );
}

const MobileCarousel = () => {
  const itemsRef = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (itemsRef.current) {
      setContainerWidth(
        itemsRef.current.scrollWidth - itemsRef.current.clientWidth
      );
    }
  }, [itemsRef]);

  return (
    <div css={[rcss.width("100%"), rcss.overflowX("hidden")]}>
      <motion.div
        css={[rcss.flex.row, rcss.rowWithGap(16), rcss.px(16)]}
        drag="x"
        dragConstraints={{
          left: -containerWidth,
          right: 0,
        }}
        ref={itemsRef}
      >
        {homepage.accounts.secondary.map((account, i) => (
          <AccountCard account={account} key={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default function Contacts({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  const { isMobile } = useAppState();

  const accountsRef = useRef<HTMLDivElement>(null);
  const accountContainerRef = useRef<HTMLDivElement>(null);

  const smooth = useSpring(percentage, {
    mass: 0.1,
  });

  const y = useTransform(smooth, (v) => {
    if (accountsRef.current && accountContainerRef.current) {
      const containerHeight =
        accountsRef.current.getBoundingClientRect().height -
        accountContainerRef.current.getBoundingClientRect().height;

      return v * -containerHeight;
    }

    return 0;
  });

  return (
    <div css={styles.contactSection} id="contact">
      <div css={styles.contactMain(isMobile)}>
        <div css={styles.contactMainInner(isMobile)}>
          <div css={[rcss.flex.column, rcss.colWithGap(16)]}>
            <Text variant="headerDefault">{homepage.contacts.header}</Text>
            <Text color="dimmer" multiline>
              {homepage.contacts.description}
            </Text>
          </div>

          <div css={[rcss.flex.column, rcss.colWithGap(16)]}>
            <AccountCard large account={homepage.accounts.main} />
            <div css={styles.buttonContainer}>
              <Button
                iconLeft={
                  <Facebook color={tokens.foregroundDefault} size={16} />
                }
                text="Facebook"
                href="https://facebook.com"
                css={rcss.flex.grow(1)}
              />
              <Button
                iconLeft={
                  <Instagram color={tokens.foregroundDefault} size={16} />
                }
                text="Instagram"
                href="https://instagram.com"
                css={rcss.flex.grow(1)}
              />
              <Button
                iconLeft={<Mail color={tokens.foregroundDefault} size={16} />}
                text="Newsletter"
                href="/newsletter"
                css={rcss.flex.grow(1)}
              />
            </div>
          </div>
        </div>

        <div css={styles.accountsContainer(isMobile)}>
          <div css={{ marginBottom: 24 }}>
            {isMobile ? <DragIndicator /> : null}
          </div>
          {isMobile ? (
            <MobileCarousel />
          ) : (
            <div css={styles.accounts} ref={accountContainerRef}>
              <motion.div
                css={[rcss.flex.column, rcss.colWithGap(8), rcss.flex.basis(0)]}
                ref={accountsRef}
                style={{ y }}
              >
                {homepage.accounts.secondary.map((account, i) => (
                  <AccountCard key={i} account={account} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
