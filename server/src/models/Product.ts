import { model, Schema } from "mongoose";
import { IProduct } from "./interfaces/products";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgUri: { type: String, required: false },
  userID: { ref: "User", type: Schema.Types.ObjectId, required: true },
});

export default model<IProduct>("Product", productSchema);
