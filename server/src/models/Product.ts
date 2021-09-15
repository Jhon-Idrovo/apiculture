import { model, Schema } from "mongoose";
import { IProduct } from "./interfaces/products";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  imgUri: { type: String, required: false },
});

export default model<IProduct>("Product", productSchema);
