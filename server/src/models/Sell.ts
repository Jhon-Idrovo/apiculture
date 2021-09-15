import { model, Schema } from "mongoose";
import { ISell } from "./interfaces/sells";

const sellSchema = new Schema<ISell>({
  userID: { ref: "User", type: Schema.Types.ObjectId, required: true },
  productID: { ref: "Product", type: Schema.Types.ObjectId },
  totalPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

export default model<ISell>("Sell", sellSchema);
