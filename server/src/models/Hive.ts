import { model, Schema } from "mongoose";
import { Harvest, Hive } from "./interfaces/hives";
const harvestSchema = new Schema<Harvest>({
  date: Number,
  amount: Number,
});
const scheme = new Schema<Hive>({
  name: { type: String, required: true },
  installationDate: { type: Date, required: true },
  harvests: [harvestSchema],
});

export default model<Hive>("Hive", scheme);
