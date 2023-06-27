import { connect } from "mongoose";

connect(process.env.MONGO_URI);

export * from "./constants";
export * from "./meme";
