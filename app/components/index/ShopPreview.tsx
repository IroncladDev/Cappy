import { homepage } from "app/config";
import useAppState from "app/hooks/useAppState";
import { rcss, tokens } from "app/tokens";
import { MotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Square } from "react-feather";
import Text from "../Text";
import Button from "../ui/Button";

const styles = {
  item: [
    rcss.borderRadius(8),
    {
      backgroundImage: `linear-gradient(135deg, ${tokens.foregroundDimmest}, ${tokens.foregroundDefault})`,
      minWidth: 240,
      minHeight: 200,
      border: `solid 2px ${tokens.backgroundHighest}`,
      overflow: "hidden",
      position: "relative" as "relative",
      "&:hover > .preview": {
        opacity: 1,
      },
    },
  ],
  itemPreviewBackground: [
    rcss.borderRadius(8),
    rcss.flex.column,
    rcss.flex.grow(1),
    rcss.width("100%"),
    rcss.height("100%"),
    {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.33))",
      position: "absolute" as "absolute",
      top: 16,
      left: 16,
      width: "calc(100% - 32px)",
      height: "calc(100% - 32px)",
    },
  ],
  itemPreview: [
    rcss.flex.row,
    rcss.center,
    rcss.p(16),
    {
      position: "absolute" as "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `rgba(0, 0, 0, 0.75)`,
      opacity: 0,
      transition: "0.25s",
    },
  ],
  countryLink: [
    rcss.rowWithGap(0),
    rcss.flex.column,
    rcss.colWithGap(8),
    {
      "& > span:first-child": {
        fontWeight: tokens.fontWeightMedium,
      },
    },
  ],
  carouselWrapper: [
    rcss.flex.row,
    rcss.overflow("hidden"),
    {
      flexWrap: "nowrap" as "nowrap",
      width: "100%",
      maxWidth: tokens.maxBodyWidth,
    },
  ],
  mobileItem: [
    rcss.borderRadius(8),
    rcss.flex.column,
    {
      background: tokens.foregroundDimmer,
      minWidth: 240,
      borderRight: `solid 2px ${tokens.backgroundHighest}`,
      overflow: "hidden",
      border: `solid 1px ${tokens.backgroundHighest}`,
      "&:last-of-type": {
        borderRight: "none",
      },
    },
  ],
  mobileItemPreviewBackground: [
    rcss.borderRadius(8, 8, 0, 0),
    rcss.flex.grow(1),
    {
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.33))",
      minHeight: 200,
    },
  ],
  mobileItemPreview: [
    rcss.p(8),
    {
      background: tokens.backgroundHighest,
    },
    rcss.flex.row,
    rcss.center,
  ],
  carouselInner: [
    rcss.flex.row,
    rcss.rowWithGap(16),
    {
      flexWrap: "nowrap" as "nowrap",
    },
  ],
  carouselItems: [rcss.flex.row, rcss.rowWithGap(16), rcss.position.relative],
  shopSection: (isMobile: boolean) => [
    rcss.flex.column,
    rcss.colWithGap(32),
    rcss.center,
    rcss.flex.grow(1),
    rcss.minHeight("100vh"),
    rcss.py(isMobile ? 64 : 0),
    {
      borderTop: `solid 2px ${tokens.backgroundHighest}`,
      background: `radial-gradient(
            circle at 50% 0%,
            ${tokens.backgroundHighest} 0%,
            ${tokens.backgroundRoot} 50%,
            ${tokens.backgroundRoot} 100%
          )`,
    },
  ],
  mobileItemContainer: [
    rcss.flex.column,
    rcss.colWithGap(32),
    rcss.p(16),
    rcss.maxWidth("100vw"),
  ],
  internationalStoresContainer: [
    rcss.flex.row,
    rcss.flex.wrap,
    rcss.center,
    {
      gap: 8,
    },
  ],
  carouselItemContainer: [
    rcss.height("100%"),
    rcss.flex.column,
    rcss.colWithGap(16),
    rcss.center,
  ],
  internationalStoresContainerDesktop: [
    rcss.flex.column,
    rcss.colWithGap(16),
    rcss.align.center,
  ],
};

interface Item {
  title: string;
  link: string;
  image: string;
  price: number;
}

const items: Array<Item> = [
  {
    title:
      "Trust in Government Knowledge of History Libertarian Freedom T-Shirt",
    link: "https://www.amazon.com/Government-Knowledge-History-Libertarian-Freedom/dp/B0BXMTCHJ8",
    image: "trust-graph",
    price: 19.99,
  },
  {
    title:
      "Sometimes Antisocial Always Antisocialist Ancap Libertarian T-Shirt",
    link: "https://www.amazon.com/Sometimes-Antisocial-Antisocialist-Libertarian-T-Shirt/dp/B0C48KGF9H",
    image: "anti-socialist",
    price: 19.99,
  },
  {
    title:
      "Capitalism Socialism Communism Libertarian Economics Freedom T-Shirt",
    link: "https://www.amazon.com/Capitalism-Socialism-Communism-Libertarian-Economics/dp/B0C1TRTG28",
    price: 19.99,
    image: "shirt-status",
  },
  {
    title: "America Rifle MURICA Libertarian Conservative Gun USA flag T-Shirt",
    price: 19.99,
    image: "america-ar",
    link: "https://www.amazon.com/America-MURICA-Libertarian-Conservative-T-Shirt/dp/B0C9WCP1FS",
  },
  {
    title: "Believe in Freedom Libertarian Ron Paul Liberty Be Free T-Shirt",
    price: 19.99,
    image: "be-free",
    link: "https://www.amazon.com/Believe-Freedom-Libertarian-Liberty-T-Shirt/dp/B07SSJXHC9",
  },
  {
    title: "Become Ungovernable Anarchy Anarchist 2A Libertarian Ancap T-Shirt",
    price: 19.99,
    image: "become-ungovernable",
    link: "https://www.amazon.com/Ungovernable-Anarchy-Anarchist-Libertarian-T-Shirt/dp/B0BNCFZP5V",
  },
  {
    link: "https://www.amazon.com/Conspiracy-Theories-Conservative-Libertarian-T-Shirt/dp/B0C1XNWX18",
    title:
      "I Need New Conspiracy Theories Conservative USA Libertarian T-Shirt",
    image: "conspiracy-old",
    price: 19.99,
  },
  {
    title:
      "Declaration of Independence liberty Constitution America USA T-Shirt",
    link: "https://www.amazon.com/Declaration-Independence-liberty-shirt-America/dp/B07FX7QB67",
    image: "declaration-independence",
    price: 19.99,
  },
  {
    title:
      "Freedom Favorite F Word America Libertarian Conservative USA T-Shirt",
    link: "https://www.amazon.com/Freedom-Favorite-America-Libertarian-Conservative/dp/B0C882X7XM",
    price: 19.99,
    image: "freedom-f",
  },
  {
    link: "https://www.amazon.com/Infringed-Second-Amendment-Libertarian-T-Shirt/dp/B0BXRXNC1W",
    title:
      "Shall Not Be Infringed Second Amendment Libertarian Pro Gun T-Shirt",
    image: "infringe-understand",
    price: 19.99,
  },
  {
    title:
      "I Said No 1776 Conservative Libertarian Freedom Gadsden Flag T-Shirt",
    link: "https://www.amazon.com/Conservative-Libertarian-Freedom-Gadsden-T-Shirt/dp/B0BZTQ8WBB",
    image: "no-tread-on-me",
    price: 19.99,
  },
  {
    title:
      "Should The Government Nope Libertarian Ancap Liberty Freedom T-Shirt",
    link: "https://www.amazon.com/Government-Libertarian-Liberty-Freedom-T-Shirt/dp/B083HVQS3W",
    image: "nope-government",
    price: 19.99,
  },
  {
    link: "https://www.amazon.com/Question-Everything-Libertarian-Conspiracy-T-Shirt/dp/B0CBSRNN9D",
    title:
      "Question Everything Libertarian USA Conspiracy Theory Ancap T-Shirt",
    image: "question-everything",
    price: 19.99,
  },
  {
    link: "https://www.amazon.com/Chickens-Homestead-Farming-Libertarian-T-Shirt/dp/B0C79XJ8TQ",
    title:
      "Raise Chickens Not Taxes Ranch Homestead Farming Libertarian T-Shirt",
    price: 19.99,
    image: "raise-chickens",
  },
  {
    link: "https://www.amazon.com/Refuse-Chicken-Conservative-Libertarian-T-Shirt/dp/B0BZRMQ1CD",
    title:
      "I Refuse to be a Chicken Nugget Gun Conservative Libertarian T-Shirt",
    image: "refuse-chicken",
    price: 19.99,
  },
  {
    link: "https://www.amazon.com/Womens-Amendment-Libertarian-Conservative-T-Shirt/dp/B07TDJ24FB",
    title:
      "Womens Second Amendment Girl 2A Libertarian pro gun Conservative T-Shirt",
    image: "second-amendment-girl",
    price: 15.99,
  },
  {
    link: "https://www.amazon.com/Conspiracy-Theories-Spoiler-Libertarian-Conservative/dp/B0BX127NJH",
    title:
      "Conspiracy Theories Spoiler Alerts Libertarian Conservative T-Shirt",
    image: "spoiler",
    price: 19.99,
  },
  {
    link: "https://www.amazon.com/Taxation-Libertarian-Voluntaryist-Liberty-T-Shirt/dp/B07W8KKVKP",
    title: "Taxation is Theft Libertarian Voluntaryist Ancap Liberty T-Shirt",
    image: "taxation-is-theft",
    price: 19.99,
  },
  {
    link: "https://www.amazon.com/Thought-Criminal-Libertarian-conservative-Liberty/dp/B083Q1S3LS",
    title: "Thought Criminal Libertarian Ancap conservative Liberty T-Shirt",
    image: "thought-criminal",
    price: 19.99,
  },
  {
    link: "https://www.amazon.com/Violent-Worthless-Libertarian-Conservative-Freedom/dp/B0BX1PW9M2",
    title:
      "Violent Ideas are Worthless Libertarian Conservative Freedom Premium T-Shirt",
    image: "violence-worthless-idea",
    price: 19.99,
  },
];

const Item = ({ item }: { item: Item }) => {
  return (
    <a target="_blank" href={item.link}>
      <div css={styles.item}>
        <div
          css={styles.itemPreviewBackground}
          style={{
            backgroundImage: `url(/images/merch/${item.image}_clipdrop-background-removal.png)`,
          }}
        />

        <div css={styles.itemPreview} className="preview">
          <Text multiline css={{ textAlign: "center" }}>
            {item.title}
          </Text>
        </div>
      </div>
    </a>
  );
};

const MobileItem = ({ item }: { item: Item }) => {
  return (
    <a target="_blank" href={item.link} draggable={false}>
      <div css={styles.mobileItem}>
        <div css={[rcss.p(16), rcss.flex.grow(1), rcss.flex.column]}>
          <div
            css={styles.mobileItemPreviewBackground}
            style={{
              backgroundImage: `url(/images/merch/${item.image}_clipdrop-background-removal.png)`,
            }}
          />
        </div>
        <div css={styles.mobileItemPreview}>
          <Text multiline css={{ textAlign: "center" }}>
            {item.title}
          </Text>
        </div>
      </div>
    </a>
  );
};

const CountryLink = ({
  title,
  flag,
  href,
}: {
  title: string;
  flag: string;
  href: string;
}) => {
  return (
    <Button
      href={href}
      target="_blank"
      css={styles.countryLink}
      text={title}
      iconRight={<Text variant="headerBig">{flag}</Text>}
    />
  );
};

const Carousel = ({
  children,
  percentage,
  direction,
}: {
  children: (d: number) => React.ReactNode;
  percentage: MotionValue<number>;
  direction: "left" | "right";
}) => {
  const p = useSpring(percentage, {
    mass: 0.1,
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(0);

  const calculatePosition = (v: number) => {
    if (wrapperRef.current && contentRef.current) {
      const { width: wrapperWidth } =
        wrapperRef.current.getBoundingClientRect();
      const { width: contentWidth } =
        contentRef.current.getBoundingClientRect();
      if (
        typeof wrapperWidth === "number" &&
        typeof contentWidth === "number"
      ) {
        return direction === "left"
          ? (wrapperWidth - contentWidth) * (1 - v)
          : (wrapperWidth - contentWidth) * v;
      }
    }
  };

  const x = useTransform(p, (v) => calculatePosition(v));

  useEffect(() => {
    x.set(calculatePosition(0));
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.getBoundingClientRect().width);
    }
  }, [wrapperRef, contentRef]);

  return (
    <div css={styles.carouselWrapper} ref={wrapperRef} id="shop">
      <motion.div css={styles.carouselInner} style={{ x }} ref={contentRef}>
        <div css={styles.carouselItems}>{children(width)}</div>
      </motion.div>
    </div>
  );
};

const DragIcon = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
    >
      <defs></defs>
      <path
        fill={tokens.foregroundDimmer}
        d="M 15.546 6.018 L 16.456 6.31 C 16.846 6.531 17.18 6.818 17.459 7.17 L 17.583 7.353 C 17.635 7.476 17.698 7.566 17.77 7.622 C 17.792 7.792 17.838 7.928 17.908 8.03 C 18.045 8.508 18.103 9.004 18.082 9.52 L 18.078 9.993 L 18.095 10.946 L 18.078 12.977 L 18.083 13.527 C 18.083 13.569 18.104 13.595 18.145 13.604 L 19.875 13.976 L 21.407 14.344 L 22.375 14.541 L 22.64 14.617 L 24.553 15.052 L 25.516 15.37 C 25.931 15.61 26.308 15.898 26.65 16.235 L 26.726 16.311 L 27.299 17.171 C 27.486 17.621 27.618 18.088 27.694 18.569 C 27.72 19.17 27.65 19.76 27.483 20.339 L 27.005 22.039 L 26.829 22.719 L 26.788 22.817 L 26.17 25.156 L 26.139 25.259 C 25.893 25.891 26 26.867 26.009 28.033 L 25.991 29.17 C 25.806 29.873 25.342 29.988 24.643 29.989 C 20.813 29.993 16.983 29.996 13.153 30 L 12.83 29.93 C 12.609 29.81 12.454 29.689 12.366 29.568 L 11.699 28.071 C 10.735 27.122 9.741 26.34 9.089 25.129 L 8.969 24.882 C 8.671 24.205 8.465 23.485 8.353 22.725 L 8.306 22.156 L 8.31 19.833 L 8.3 19.15 C 8.299 18.465 8.476 17.851 8.829 17.306 L 9.094 16.961 C 10.009 15.996 10.89 16.012 12.169 16.013 C 12.192 16.013 12.211 15.995 12.211 15.972 L 12.208 14.241 L 12.197 12.567 L 12.208 11.23 L 12.208 9.509 C 12.1 8.306 12.497 7.329 13.396 6.577 L 13.664 6.395 C 14.248 6.075 14.876 5.949 15.546 6.018 Z M 15.033 7.972 C 14.378 8.131 14.204 8.539 14.199 9.203 C 14.168 12.548 14.167 15.895 14.198 19.241 C 14.156 19.386 14.159 19.53 14.206 19.672 C 14.145 20.323 14.094 20.822 13.342 20.966 C 13.124 20.981 12.938 20.959 12.783 20.9 C 12.469 20.734 12.287 20.504 12.235 20.209 L 12.21 18.674 L 12.205 18.045 C 12.205 18.004 12.185 17.984 12.146 17.983 C 11.443 17.966 10.823 17.861 10.46 18.435 L 10.32 18.672 C 10.277 21.08 9.944 23.745 11.567 25.187 L 11.738 25.346 C 12.137 25.715 12.528 26.09 12.909 26.468 C 13.344 26.899 13.568 27.406 13.813 27.949 C 13.828 27.984 13.855 28 13.892 28 L 14.912 27.988 L 15.439 28.002 L 16.353 28.002 L 16.959 27.992 L 17.939 28.002 L 19.964 27.997 L 21.018 27.993 L 23.02 28.002 L 23.961 28.005 C 23.99 28.005 24.014 27.981 24.014 27.952 L 24.011 26.097 L 24.118 25.049 L 24.503 23.678 L 24.602 23.301 L 25.148 21.312 L 25.248 20.907 C 25.465 20.152 25.786 19.333 25.678 18.542 C 25.466 17.686 24.93 17.166 24.069 16.983 L 23.316 16.817 L 22.971 16.741 L 20.816 16.253 L 20.144 16.1 L 18.32 15.693 C 18.225 15.647 18.139 15.624 18.063 15.623 C 17.435 15.482 16.59 15.439 16.218 14.855 L 16.115 14.617 L 16.106 12.251 L 16.084 11.682 C 16.128 10.82 16.127 9.946 16.082 9.061 C 16.082 8.375 15.732 8.012 15.033 7.972 Z"
      ></path>
    </svg>
  );
};

export const DragIndicator = () => {
  return (
    <div css={rcss.position.relative}>
      <div css={[rcss.flex.column, rcss.colWithGap(4), rcss.align.center]}>
        <Text color="dimmest">Drag to view more</Text>
        <motion.div
          css={[rcss.flex.row, rcss.rowWithGap(4)]}
          animate={{
            x: ["-10px", "0px", "-10px"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {new Array(5).fill(0).map((_, i) => (
            <Square key={i} color={tokens.foregroundDimmest} size={16} />
          ))}
        </motion.div>
      </div>
      <motion.div
        css={[
          rcss.position.absolute,
          {
            bottom: 16,
            left: "50%",
          },
        ]}
        initial={{
          translateY: "100%",
          translateX: "-50%",
        }}
        animate={{
          x: ["-100%", "100%", "-100%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <DragIcon />
      </motion.div>
    </div>
  );
};

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
    <div
      css={[
        {
          width: "100%",
          position: "relative",
          overflowX: "hidden",
        },
      ]}
    >
      <motion.div
        css={[rcss.flex.row, rcss.rowWithGap(16), rcss.px(16)]}
        drag="x"
        dragConstraints={{
          left: -containerWidth,
          right: 0,
        }}
        ref={itemsRef}
      >
        {items.map((item, i) => (
          <MobileItem item={item} key={i} />
        ))}
      </motion.div>
    </div>
  );
};

export default function ShopPreview({
  percentage,
}: {
  percentage: MotionValue<number>;
}) {
  const { isMobile } = useAppState();

  return (
    <div css={styles.shopSection(isMobile)} id="shop">
      <Text variant="headerBig">{homepage.shop.title}</Text>

      {isMobile ? (
        <div css={styles.mobileItemContainer}>
          <DragIndicator />
          <div css={[rcss.maxWidth("100vw"), rcss.overflowX("hidden")]}>
            <MobileCarousel />
          </div>

          <div css={[rcss.flex.column, rcss.colWithGap(8), rcss.center]}>
            <Text
              variant="subheadDefault"
              multiline
              css={{ textAlign: "center" }}
            >
              {homepage.shop.description}
            </Text>
            <Button
              {...homepage.shop.storeButton}
              level={1}
              iconRight={
                <ArrowRight color={tokens.foregroundDefault} size={16} />
              }
              css={rcss.minWidth(256)}
              target="_blank"
            />
          </div>

          <div css={[rcss.flex.column, rcss.colWithGap(16), rcss.align.center]}>
            <Text variant="subheadDefault">International Stores</Text>
            <div css={styles.internationalStoresContainer}>
              {homepage.shop.international.map((item, i) => (
                <CountryLink key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div css={[rcss.flex.column, rcss.colWithGap(16)]}>
          <Carousel direction="right" percentage={percentage}>
            {(width) => (
              <>
                {items.slice(0, Math.floor(items.length / 2)).map((item, i) => (
                  <Item key={i} item={item} />
                ))}
                <div css={styles.carouselItemContainer} style={{ width }}>
                  <Text variant="subheadDefault">
                    {homepage.shop.description}
                  </Text>
                  <Button
                    {...homepage.shop.storeButton}
                    level={1}
                    iconRight={
                      <ArrowRight color={tokens.foregroundDefault} size={16} />
                    }
                    css={rcss.minWidth(256)}
                    target="_blank"
                  />
                </div>
              </>
            )}
          </Carousel>

          <Carousel direction="left" percentage={percentage}>
            {(width) => (
              <>
                <div
                  css={styles.internationalStoresContainerDesktop}
                  style={{ width }}
                >
                  <Text variant="subheadDefault">International Stores</Text>
                  <div css={[rcss.flex.row, rcss.rowWithGap(16)]}>
                    {homepage.shop.international.map((item, i) => (
                      <CountryLink key={i} {...item} />
                    ))}
                  </div>
                </div>
                {items.slice(Math.floor(items.length / 2)).map((item, i) => (
                  <Item key={i} item={item} />
                ))}
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
}
