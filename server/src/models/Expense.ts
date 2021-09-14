import { model, Schema } from "mongoose";
import { Expense } from "./interfaces/expenses";

const expenseSchema = new Schema<Expense>({
  description: String,
  hive: { ref: "Hive", type: Schema.Types.ObjectId, require: false },
  amount: Number,
  date: Number,
});

export default model<Expense>("Expense", expenseSchema);
