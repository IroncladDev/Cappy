import Head from "next/head";

export default function HeadMetadata() {
  return (
    <Head>
      <title>Declaration of Memes</title>
      <meta property="og:title" content="Framer Boilerplate" />
      <meta name="description" content="This is a framer boilerplate" />
      <meta property="og:description" content="This is a framer boilerplate" />
      <link rel="icon" href="/logo/32-round.webp" type="image/webp" />
      {/* <meta property="og:image" content="/images/cover.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:image" content="/images/cover.png" /> */}
    </Head>
  );
}
