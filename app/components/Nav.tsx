import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Text from "./Text";
import { rcss, tokens } from "app/tokens";
import { Grid, Home, Info, Mail, ShoppingCart, Twitter } from "react-feather";
import Button from "./ui/Button";
import useAppState from "app/hooks/useAppState";

const styles = {
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
  navOuter: (open: boolean) => [
    rcss.position.fixed,
    rcss.flex.row,
    rcss.top(0),
    rcss.left(0),
    rcss.bottom(0),
    rcss.height("100vh"),
    open ? rcss.width("100vw") : rcss.width(0),
    {
      background: open ? "rgba(0, 0, 0, 0.25)" : "transparent",
    },
  ],
  nav: [
    rcss.flex.column,
    rcss.p(16),
    rcss.pt(48),
    {
      background: `linear-gradient(135deg, ${tokens.backgroundRoot}, ${tokens.backgroundDefault})`,
      borderRight: `solid 2px ${tokens.backgroundHigher}`,
      minWidth: 240,
    },
  ],
  buttonLinks: [
    rcss.flex.column,
    rcss.colWithGap(8),
    rcss.pt(8),
    {
      borderTop: `solid 1px ${tokens.backgroundHigher}`,
      "& a": {
        display: "flex",
        "& button": {
          flexGrow: 1,
        },
      },
    },
  ],
  taco: [
    rcss.flex.column,
    rcss.center,
    rcss.p(16),
    {
      position: "absolute" as "absolute",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      "& .line": {
        width: 24,
        height: 2,
        background: tokens.accentDefault,
        position: "absolute" as "absolute",
        borderRadius: 4,
      },
    },
  ],
  tacoInner: {
    position: "relative" as "relative",
    height: 20,
    width: 24,
  },
  progress: [
    rcss.position.absolute,
    {
      top: 0,
      left: 0,
      height: 4,
      background: tokens.accentDefault,
    },
  ],
};

const animations = {
  nav: {
    open: {
      transform: `translateX(0%)`,
      transition: {
        type: "spring",
        mass: 0.05,
        staggerChildren: 0.05,
      },
    },
    closed: {
      transform: `translateX(-100%)`,
      transition: {
        type: "spring",
        mass: 0.05,
        staggerChildren: 0.05,
      },
    },
  },
  navItem: {
    hover: {
      scale: 1.05,
    },
    tap: {
      scale: 0.95,
    },
  },
  line1: {
    open: {
      top: "calc(50% - 1px)",
      transform: "rotate(-45deg)",
    },
  },
  line2: {
    open: {
      opacity: 0,
    },
  },
  line3: {
    open: {
      top: "calc(50% - 1px)",
      transform: "rotate(45deg)",
      width: 24,
    },
    closed: {
      top: "calc(100% - 2px)",
      width: 16,
    },
  },
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

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [bodyHeight, setBodyHeight] = useState(0);
  const { scrollY } = useScroll();
  const { isMobile } = useAppState();

  const scrollYProgress = useSpring(scrollY, {
    mass: 0.05,
  });

  const scrollProgressWidth = useTransform(scrollYProgress, (v) =>
    bodyHeight ? (v / bodyHeight) * 100 + "vw" : 0
  );

  useEffect(() => {
    setBodyHeight(document.body.scrollHeight - window.innerHeight);
  }, []);

  return (
    <motion.div css={styles.navOuter(open)}>
      <motion.nav
        css={styles.nav}
        variants={animations.nav}
        animate={open ? "open" : "closed"}
        initial={false}
      >
        <a
          href="#"
          css={[
            rcss.flex.row,
            rcss.rowWithGap(8),
            rcss.align.center,
            rcss.p(8),
          ]}
        >
          <img src="/logo/64-round.webp" width={24} height={24} />
          <Text variant="subheadDefault">Liberty Cappy</Text>
        </a>

        {links.map(({ text, href, icon }, i) => (
          <NavItem
            key={i}
            text={text}
            href={href}
            icon={icon || null}
            onClick={() => setOpen(false)}
          />
        ))}

        <div css={{ flexGrow: 1 }} />

        <div css={styles.buttonLinks}>
          <Button
            text="Newsletter"
            small
            level={1}
            href="/newsletter"
            iconLeft={<Mail size={16} color={tokens.foregroundDefault} />}
          />
          <Button
            text="Follow on X / Twitter"
            small
            level={1}
            href="https://twitter.com/LibertyCappy"
            iconLeft={<Twitter size={16} color={tokens.foregroundDefault} />}
          />
          <Text color="dimmest" variant="small">
            &copy; Liberty Cappy{" "}
            {new Date().getFullYear() === 2023
              ? 2023
              : `${2023} - ${new Date().getFullYear()}`}
          </Text>
        </div>
      </motion.nav>
      {open ? (
        <div
          css={[rcss.flex.column, rcss.flex.grow(1)]}
          onClick={() => setOpen(false)}
        />
      ) : null}

      <button
        aria-label="Open Navigation"
        css={styles.taco}
        onClick={() => setOpen(!open)}
      >
        <motion.div css={styles.tacoInner}>
          <motion.div
            className="line"
            variants={animations.line1}
            animate={open ? "open" : "closed"}
          />
          <motion.div
            className="line"
            css={{ top: "calc(50% - 1px)" }}
            variants={animations.line2}
            animate={open ? "open" : "closed"}
          />
          <motion.div
            className="line"
            variants={animations.line3}
            animate={open ? "open" : "closed"}
            initial={false}
          />
        </motion.div>
      </button>

      {isMobile ? null : (
        <motion.div
          css={styles.progress}
          style={{
            width: scrollProgressWidth,
          }}
        />
      )}
    </motion.div>
  );
}
