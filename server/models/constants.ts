import { Schema, Model, models, model, Document } from "mongoose";

export interface IConstants {
  accessToken: string;
  refreshToken: string;
  timeExpired: number;
}

export type ConstantsModel = Model<IConstants, {}>;

const ConstantsSchema = new Schema<IConstants>({
  accessToken: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  timeExpired: {
    type: Number,
  },
});

export const Constants =
  (models.Constants as ConstantsModel) ||
  model<IConstants, ConstantsModel>("Constants", ConstantsSchema);

export const fetchConstants = async (): Promise<
  Document<any, any, IConstants>
> => {
  const constant = await Constants.findOne({});

  if (!constant) throw new Error("Could not find constant");

  return constant;
};

(async () => {
  try {
    fetchConstants();
  } catch (e) {
    const baseConstant = new Constants({
      accessToken: "",
      refreshToken: "",
      timeExpired: 0,
    });

    await baseConstant.save();
  }
})();
