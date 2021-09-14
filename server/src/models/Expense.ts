import { model, Schema } from "mongoose";
import { Expense } from "./interfaces/expenses";

const expenseSchema = new Schema<Expense>({
  description: String,
  hive: { ref: "Hive", type: Schema.Types.ObjectId, required: false },
  amount: {type:Number, required:true},
  date: {type:Number, required:true},
});

export default model<Expense>("Expense", expenseSchema);
