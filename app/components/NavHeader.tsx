import { motion } from "framer-motion";
import { rcss, tokens } from "app/tokens";
import Text from "./Text";
import useAppState from "app/hooks/useAppState";
import Link from "next/link";
import { Grid, Home, Info, ShoppingCart, Mail } from "react-feather";
import Button from "./ui/Button";

const animations = {
  navItem: {
    hover: {
      scale: 1.05,
    },
    tap: {
      scale: 0.95,
    },
  },
};

interface NavLink {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

export const links: Array<NavLink> = [
  {
    text: "Home",
    href: "/#",
    icon: <Home color={tokens.foregroundDimmer} size={20} />,
  },
  {
    text: "About",
    href: "/#about",
    icon: <Info color={tokens.foregroundDimmer} size={16} />,
  },
  {
    text: "Shop",
    href: "/#shop",
    icon: <ShoppingCart color={tokens.foregroundDimmer} size={16} />,
  },
  {
    text: "Contacts",
    href: "/#contact",
    icon: <Grid color={tokens.foregroundDimmer} size={16} />,
  },
];

const styles = {
  header: [
    rcss.flex.row,
    rcss.center,
    {
      background: `linear-gradient(90deg, ${tokens.backgroundDefault}, ${tokens.backgroundHigher})`,
      position: "fixed" as "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      borderBottom: `solid 2px ${tokens.backgroundHighest}`,
    },
  ],
  headerContent: (isMobile: boolean) => [
    rcss.px(16),
    rcss.py(8),
    rcss.flex.row,
    isMobile ? rcss.center : rcss.align.center,
    rcss.maxWidth(tokens.maxBodyWidth),
    rcss.flex.grow(1),
    rcss.rowWithGap(8),
  ],
  navItem: [
    rcss.p(8),
    rcss.flex.row,
    rcss.rowWithGap(8),
    rcss.align.center,
    rcss.borderRadius(8),
    {
      background: "transparent",
      "&:hover": {
        background: tokens.backgroundDefault,
      },
      "&:active": {
        background: tokens.backgroundHigher,
      },
      transition: "0.25s",
    },
  ],
};

export function NavItem({
  text,
  href,
  onClick = () => {},
  icon,
  small,
}: {
  text: string;
  href: string;
  onClick?: () => void;
  icon: React.ReactNode | null;
  small?: boolean;
}) {
  return (
    <Link href={href} passHref>
      <a onClick={onClick}>
        <motion.div
          variants={animations.navItem}
          css={styles.navItem}
          whileHover={animations.navItem.hover}
          whileTap={animations.navItem.tap}
        >
          {icon}
          <Text color="dimmer" variant={small ? "small" : "default"}>
            {text}
          </Text>
        </motion.div>
      </a>
    </Link>
  );
}

export default function NavHeader() {
  const { isMobile } = useAppState();

  return (
    <motion.div
      css={styles.header}
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
    >
      <div css={styles.headerContent(isMobile)}>
        {isMobile ? null : (
          <a
            href="/#"
            css={[rcss.flex.row, rcss.rowWithGap(8), rcss.align.center]}
          >
            <img src="/logo/64-round.webp" width={36} height={36} />
            <Text variant="subheadDefault">Liberty Cappy</Text>
          </a>
        )}

        {isMobile ? null : <div css={rcss.flex.grow(1)} />}

        {links.map(({ text, href, icon }, i) => (
          <NavItem key={i} text={text} href={href} icon={icon || null} small />
        ))}

        {isMobile ? null : (
          <Button
            text="Newsletter"
            level={2}
            iconLeft={<Mail color={tokens.foregroundDefault} size={16} />}
            href="/newsletter"
            style={{
              background: tokens.accentDimmer,
              color: tokens.foregroundDefault,
            }}
            whileHover={{
              background: tokens.accentDimmest,
              color: tokens.foregroundDefault,
              borderColor: tokens.accentDefault,
            }}
            whileTap={{
              background: tokens.accentDimmest,
              color: tokens.foregroundDefault,
              borderColor: tokens.accentDefault,
            }}
            small
          />
        )}
      </div>
    </motion.div>
  );
}
