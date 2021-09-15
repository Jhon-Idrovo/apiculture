import { model, Schema } from "mongoose";
import { ISell } from "./interfaces/sells";

const sellSchema = new Schema<ISell>({
  product: { ref: "Product", type: Schema.Types.ObjectId },
  totalPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

export default model<ISell>("Sell", sellSchema);
