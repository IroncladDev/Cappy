import { rcss, tokens } from "app/tokens";
import { MotionValue, motion } from "framer-motion";
import { homepage } from "app/config";
import Text from "../Text";
import Button from "../ui/Button";
import { Facebook, Instagram, Mail } from "react-feather";

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
            minWidth: 0
          },
        ]}
        initial={{
          background: tokens.backgroundRoot,
          opacity: 0,
          y: "50%",
        }}
        whileInView={{
          opacity: 1,
          y: "0%",
        }}
        whileHover={{
          background: tokens.backgroundDefault,
        }}
        transition={{
          duration: 0.5,
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

export default function Contacts() {
  return (
    <div
      css={[
        rcss.flex.column,
        rcss.align.center,
        rcss.px(16),
        rcss.py(64),
        {
          background: tokens.backgroundRoot,
        },
      ]}
      id="contact"
    >
      <div
        css={[
          rcss.flex.column,
          rcss.colWithGap(16),
          rcss.maxWidth(tokens.maxBodyWidth),
        ]}
      >
        <Text
          variant="headerDefault"
          css={{ textAlign: "center", marginBottom: 32 }}
        >
          {homepage.contacts.header}
        </Text>

        <div css={[rcss.flex.row, rcss.rowWithGap(16)]}>
          <AccountCard account={homepage.accounts.main} large />

          <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.flex.grow(1)]}>
            <Button
              text="Facebook"
              href="https://facebook.com"
              css={{ width: "100%" }}
              iconLeft={<Facebook color={tokens.foregroundDefault} size={16} />}
            />
            <Button
              text="Instagram"
              href="https://facebook.com"
              css={{ width: "100%" }}
              iconLeft={
                <Instagram color={tokens.foregroundDefault} size={16} />
              }
            />
            <Button
              text="Newsletter"
              href="/newsletter"
              css={{ width: "100%" }}
              iconLeft={<Mail color={tokens.foregroundDefault} size={16} />}
            />
          </div>
        </div>

        <div
          css={[
            {
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: 16,
            },
          ]}
        >
          {homepage.accounts.secondary.map((account, i) => (
            <AccountCard key={i} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
}
