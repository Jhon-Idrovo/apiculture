import { model, Schema } from "mongoose";
import { IExpense } from "./interfaces/expenses";

const expenseSchema = new Schema<IExpense>({
  description: String,
  hive: { ref: "Hive", type: Schema.Types.ObjectId, required: false },
  amount: { type: Number, required: true },
  date: { type: Number, required: true },
});

export default model<IExpense>("Expense", expenseSchema);
