import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import Twitter from "next-auth/providers/twitter";

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  providers: [
    Twitter({
      clientId: process.env.TW_CLIENT_ID as string,
      clientSecret: process.env.TW_CLIENT_SECRET as string,
      version: "2.0"
    }),
  ],
  callbacks: {
    async jwt({
      token, 
      user, 
      account = {}, 
      profile, 
      isNewUser
    }) {
      if(!account) throw new Error("Failed to access account")
      
      if (account.provider && !token[account.provider]) {
        token[account.provider] = {};
      }

      if (account.access_token && account.provider) {
        (token[account.provider] as JWT).access_token = account.access_token;
      }

      if (account.refresh_token && account.provider) {
        (token[account.provider] as JWT).refresh_token = account.refresh_token;
      }

      console.log(account)

      return token;
    },
  }
};

export default NextAuth(options);