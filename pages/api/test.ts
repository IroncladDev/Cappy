import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { TwitterApi } from "twitter-api-v2";

const app = nc();

// Instantiate with desired auth type (here's Bearer v2 auth)
// const twitterClient = new TwitterApi({
//   appKey: process.env.TW_API_KEY as string,
//   appSecret: process.env.TW_API_SECRET as string,

//   accessToken: process.env.TW_ACCESS_TOKEN as string,
//   accessSecret: process.env.TW_ACCESS_SECRET as string,
// });

const twitterClient = new TwitterApi(
  "LW5vUWZINlJ2N0IzbGlrTVJWSEM3bDF3UjdnS0pJSjdfUEJEOW9JVG45bC1UOjE2ODc3Nzg4NjEzNTU6MTowOmF0OjE"
);

// Tell typescript it's a readonly app
const readOnlyClient = twitterClient.readOnly;

app.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await readOnlyClient.currentUserV2(true);
    console.log(user, twitterClient);
    res.json(user);
  } catch (e) {
    console.log(e);
  }
});

export default app;
