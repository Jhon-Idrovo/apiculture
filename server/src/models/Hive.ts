import { model, Schema } from "mongoose";
import { IHarvest, IHive } from "./interfaces/hives";
const harvestSchema = new Schema<IHarvest>({
  date: Number,
  amount: Number,
});
const scheme = new Schema<IHive>({
  userID: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
  installationDate: { type: Date, required: true },
  harvests: [harvestSchema],
});

export default model<IHive>("Hive", scheme);
