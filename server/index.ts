import express from "express";
import next from "next";
import cron from "node-cron";
import pullTweets from "./pullTweets";

const app = express();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

cron.schedule("0 0 * * *", () => {
  pullTweets();
});

nextApp.prepare().then(() => {
  app.get("*", nextHandler);
  app.post("*", nextHandler);

  app.listen(3000, (err) => {
    if (err) throw err;
    console.log(`Listening on port 3000`);
  });
});
