import { metaDescription } from "app/config";
import Head from "next/head";

export default function HeadMetadata() {
  return (
    <Head>
      <title>Liberty Cappy</title>
      <meta property="og:title" content="Liberty Cappy" />
      <meta property="twitter:title" content="Liberty Cappy" />
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="og:url" content="https://libertycappy.com" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" href="/logo/32-round.webp" type="image/webp" />
      <meta property="og:image" content="/images/cover.png" />
      <meta property="og:image:width" content="1500" />
      <meta property="og:image:height" content="1000" />
      <meta property="twitter:image" content="/images/cover.png" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content="@LibertyCappy" />
      <meta property="twitter:creator" content="@LibertyCappy" />
    </Head>
  );
}
