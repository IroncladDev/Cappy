import { metaDescription } from "app/config";
import Head from "next/head";

export default function HeadMetadata() {
  return (
    <Head>
      <title>Declaration of Memes</title>
      <meta property="og:title" content="Declaration of Memes" />
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/logo/32-round.webp" type="image/webp" />
      <meta property="og:image" content="/images/cover.jpeg" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:image" content="/images/cover.jpeg" />
    </Head>
  );
}
