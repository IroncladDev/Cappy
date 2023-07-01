import NextAuth, {
  Account,
  CallbacksOptions,
  NextAuthOptions,
  Profile,
} from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { fetchConstants } from "server/models";
import { UsernameDev, dev, UsernameProd } from "../../../server/lib/constants";

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    Twitter({
      clientId: process.env.TW_CLIENT_ID as string,
      clientSecret: process.env.TW_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: Parameters<
      CallbacksOptions<
        Profile & {
          data: {
            id: string;
            profile_image_url: string;
            username: string;
            name: string;
          };
        },
        Account
      >["jwt"]
    >[0]) {
      if (
        !account ||
        !account.access_token ||
        !account.refresh_token ||
        !profile
      )
        return;

      let tokens: {
        accessToken: string;
        refreshToken: string;
      } = {
        accessToken: account.access_token,
        refreshToken: account.refresh_token,
      };

      if (
        dev
          ? profile.data.username === UsernameDev ||
            profile.data.username === UsernameProd
          : profile.data.username === UsernameProd
      ) {
        const constants = await fetchConstants();
        constants.accessToken = tokens.accessToken;
        constants.refreshToken = tokens.refreshToken;
        await constants.save();
      } else {
        return;
      }

      return Object.assign(token, {
        twitter: tokens,
      });
    },
  },
};

export default NextAuth(options);
