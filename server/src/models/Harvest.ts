import { model, Schema } from "mongoose";
import { IHarvest } from "./interfaces/harvests";

const harvestSchema = new Schema<IHarvest>({
  date: Number,
  amount: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  hive: { type: Schema.Types.ObjectId, ref: "Hive", required: true },
  userID: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default model<IHarvest>("Harvest", harvestSchema);
