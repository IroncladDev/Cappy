import { Schema, Model, models, model } from "mongoose";

export interface IConstants {
  accessToken: string;
  refreshToken: string;
}

export type ConstantsModel = Model<IConstants, {}>;

const ConstantsSchema = new Schema<IConstants>({
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  }
});

export const Constants =
  (models.Constants as ConstantsModel) ||
  model<IConstants, ConstantsModel>("Constants", ConstantsSchema);

export const fetchConstants = async () => {
  const constant = await Constants.findOne({});

  if (!constant) throw new Error("Could not find constant");

  return constant;
};
