import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Text from "./Text";
import { rcss, tokens } from "app/tokens";
import { Grid, Home, Info, Mail, ShoppingCart, Twitter } from "react-feather";
import Button from "./ui/Button";
import useAppState from "app/hooks/useAppState";

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
};

function NavItem({
  text,
  href,
  onClick,
  icon,
}: {
  text: string;
  href: string;
  onClick: () => void;
  icon: React.ReactNode | null;
}) {
  return (
    <Link href={href} passHref>
      <a onClick={onClick}>
        <motion.div
          variants={animations.navItem}
          css={[
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
          ]}
          whileHover={animations.navItem.hover}
          whileTap={animations.navItem.tap}
        >
          {icon}
          <Text color="dimmer">{text}</Text>
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

const links: Array<NavLink> = [
  {
    text: "Home",
    href: "/",
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
    <motion.div
      css={[
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
      ]}
    >
      <motion.nav
        css={[
          rcss.flex.column,
          rcss.p(16),
          rcss.pt(64),
          {
            background: `linear-gradient(135deg, ${tokens.backgroundRoot}, ${tokens.backgroundDefault})`,
            borderRight: `solid 2px ${tokens.backgroundHigher}`,
            minWidth: 240,
          },
        ]}
        variants={animations.nav}
        animate={open ? "open" : "closed"}
      >
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

        <div
          css={[
            rcss.flex.column,
            rcss.colWithGap(8),
            rcss.pt(8),
            {
              borderTop: `solid 1px ${tokens.backgroundHigher}`,
            },
          ]}
        >
          <Button
            text="Newsletter"
            small
            level={1}
            iconLeft={
              <Mail
                size={16}
                color={tokens.foregroundDefault}
                href="/newsletter"
              />
            }
          />
          <Button
            text="Follow on X / Twitter"
            small
            level={1}
            iconLeft={
              <Twitter
                size={16}
                color={tokens.foregroundDefault}
                href="https://twitter.com/LibertyCappy"
              />
            }
          />
          <Text color="dimmest" variant="small">
            &copy; Declaration of Memes{" "}
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
        css={[
          rcss.flex.column,
          rcss.center,
          rcss.p(16),
          {
            position: "absolute",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            "& .line": {
              width: 24,
              height: 2,
              background: tokens.accentDefault,
              position: "absolute",
              borderRadius: 4,
            },
          },
        ]}
        onClick={() => setOpen(!open)}
      >
        <motion.div
          css={{
            position: "relative",
            height: 20,
            width: 24,
          }}
        >
          <motion.div
            className="line"
            animate={
              open
                ? {
                    top: "calc(50% - 1px)",
                    transform: "rotate(-45deg)",
                  }
                : undefined
            }
          />
          <motion.div
            className="line"
            css={{ top: "calc(50% - 1px)" }}
            animate={
              open
                ? {
                    opacity: 0,
                  }
                : undefined
            }
          />
          <motion.div
            className="line"
            animate={
              open
                ? {
                    top: "calc(50% - 1px)",
                    transform: "rotate(45deg)",
                    width: 24,
                  }
                : {
                    top: "calc(100% - 2px)",
                    width: 16,
                  }
            }
          />
        </motion.div>
      </button>

      {isMobile ? null : (
        <motion.div
          css={[
            rcss.position.absolute,
            {
              top: 0,
              left: 0,
              height: 4,
              background: tokens.accentDefault,
            },
          ]}
          style={{
            width: scrollProgressWidth,
          }}
        />
      )}
    </motion.div>
  );
}
