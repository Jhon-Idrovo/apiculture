import { model, Schema } from "mongoose";
import { IHive } from "./interfaces/hives";
const scheme = new Schema<IHive>({
  userID: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: { type: String, required: true },
  installationDate: { type: Date, required: true },
  totalHarvests: Number,
});

export default model<IHive>("Hive", scheme);
