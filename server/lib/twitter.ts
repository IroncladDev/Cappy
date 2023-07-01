import { fetchConstants } from "server/models";
import { TwitterApi } from "twitter-api-v2";

export async function TwitterClient() {
  const { accessToken, refreshToken } = await fetchConstants();

  const { readOnly } = new TwitterApi(accessToken);

  const twitterClient = new TwitterApi({
    appKey: process.env.TW_API_KEY as string,
    appSecret: process.env.TW_API_SECRET as string,

    accessToken: process.env.TW_ACCESS_TOKEN as string,
    accessSecret: process.env.TW_ACCESS_SECRET as string,
  });

  const user = await readOnly.currentUserV2(true);

  return {
    user,
    v2: readOnly.v2,
    v1: twitterClient.v1,
  };
}