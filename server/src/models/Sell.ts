import { model, Schema } from "mongoose";
import { Sell } from "./interfaces/Sells";

const sellSchema = new Schema<Sell>({
  product: { ref: "Product", type: Schema.Types.ObjectId },
  totalPrice: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
});

export default model<Sell>("Sell", sellSchema);
