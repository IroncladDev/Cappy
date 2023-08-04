import { rcss, tokens } from "app/tokens";
import { motion, MotionValue, useSpring, useTransform } from "framer-motion";
import { homepage } from "app/config";
import Text from "../Text";
import Button from "../ui/Button";
import { Facebook, Instagram, Mail } from "react-feather";
import { useRef } from "react";

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
    <a target="_blank" href={account.url}>
      <motion.div
        css={[
          rcss.borderRadius(16),
          rcss.p(16),
          large ? rcss.flex.row : rcss.flex.column,
          large ? rcss.rowWithGap(16) : rcss.colWithGap(16),
          large ? rcss.align.center : null,
          {
            border: `solid 1px ${tokens.backgroundHigher}`,
            flex: "1 1 0",
            minWidth: 0,
          },
        ]}
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
              width={large ? 128 : 64}
              height={large ? 128 : 64}
              src={account.image}
              css={[
                rcss.borderRadius(16),
                {
                  border: `solid 1px ${tokens.backgroundHigher}`,
                },
              ]}
            />

            <div
              css={[
                rcss.flex.column,
                rcss.colWithGap(8),
                {
                  flex: "1 1 0",
                  minWidth: 0,
                },
              ]}
            >
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
          <div css={[rcss.flex.row, rcss.rowWithGap(16), rcss.align.center]}>
            <img
              width={large ? 128 : 64}
              height={large ? 128 : 64}
              src={account.image}
              css={[
                rcss.borderRadius(16),
                {
                  border: `solid 1px ${tokens.backgroundHigher}`,
                },
              ]}
            />

            <div
              css={[
                rcss.flex.column,
                rcss.colWithGap(8),
                {
                  flex: "1 1 0",
                  minWidth: 0,
                },
              ]}
            >
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

export default function Contacts({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
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
    <div
      css={[
        rcss.flex.column,
        rcss.flex.grow(1),
        rcss.center,
        rcss.px(16),
        {
          background: `linear-gradient(0deg, ${tokens.backgroundRoot}, ${tokens.backgroundDefault})`,
          borderTop: `solid 2px ${tokens.backgroundHigher}`,
        },
      ]}
      id="contact"
    >
      <div
        css={[
          rcss.flex.row,
          rcss.rowWithGap(16),
          rcss.center,
          rcss.maxWidth(tokens.maxBodyWidth),
          rcss.width("100vw"),
        ]}
      >
        <div
          css={[
            rcss.flex.column,
            rcss.colWithGap(32),
            {
              flex: "1 1 0",
              minWidth: 0,
            },
          ]}
        >
          <div css={[rcss.flex.column, rcss.colWithGap(16)]}>
            <Text variant="headerDefault">{homepage.contacts.header}</Text>
            <Text color="dimmer" multiline>
              {homepage.contacts.description}
            </Text>
          </div>

          <div css={[rcss.flex.column, rcss.colWithGap(16)]}>
            <AccountCard large account={homepage.accounts.main} />
            <div
              css={[
                rcss.flex.row,
                rcss.rowWithGap(16),
                rcss.width("100%"),
                {
                  "& a": {
                    flexGrow: 1,
                    display: "flex",
                  },
                },
              ]}
            >
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

        <div
          css={[
            rcss.flex.column,
            rcss.position.relative,
            rcss.height("100%"),
            rcss.minWidth(0),
            {
              flex: "1 1 0",
            },
          ]}
        >
          <div
            css={[
              rcss.position.absolute,
              rcss.top(0),
              rcss.left(0),
              rcss.width("100%"),
              rcss.height("100%"),
            ]}
            ref={accountContainerRef}
          >
            <motion.div
              css={[
                rcss.flex.column,
                rcss.colWithGap(8),
                rcss.px(8),
                rcss.flex.basis(0),
              ]}
              ref={accountsRef}
              style={{ y }}
            >
              {homepage.accounts.secondary.map((account, i) => (
                <AccountCard key={i} account={account} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
