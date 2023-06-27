import { Schema, Model, models, model } from "mongoose";

export interface IMeme {
  text: string;
  imageUrl: string;
  content: number;
  tweetUrl: string;
  createdAt: Date;
}

export type MemeModel = Model<IMeme, {}>;

const MemeSchema = new Schema<IMeme>({
  text: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    type: Number,
    required: true,
  },
  tweetUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Meme =
  (models.Constants as MemeModel) ||
  model<IMeme, MemeModel>("Memes", MemeSchema);
