import { model, Schema } from "mongoose";
import { Sell } from "./interfaces/Sells";

const sellSchema = new Schema<Sell>({
  product: { ref: "Product", type: Schema.Types.ObjectId },
  totalPrice: Number,
  totalAmount: Number,
});

export default model<Sell>("Sell", sellSchema);
