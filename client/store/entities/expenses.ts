import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../config/axiosInstance";
import { EXPENSES_ENDPOINT } from "../../config/config";
import { errorToMessage } from "../../utils/utils";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface IExpense {
  hive?: string;
  amount: number;
  description: string;
  date: string;
}
const expensesInitialState = {
  loading: false,
  error: "",
  expensesList: [] as IExpense[],
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesInitialState,
  reducers: {
    expensesLoading: (expenses) => {
      expenses.loading = true;
    },
    expensesLoaded: (expenses, action: PayloadAction<IExpense[]>) => {
      expenses.expensesList = action.payload;
      expenses.loading = false;
      expenses.error = "";
    },
    expensesLoadFailed: (expenses, action: PayloadAction<string>) => {
      expenses.error = action.payload;
      expenses.loading = false;
    },
  },
});

const { expensesLoading, expensesLoaded, expensesLoadFailed } =
  expensesSlice.actions;
export default expensesSlice.reducer;

// ACTION FUNCTIONS
export const loadExpenses = (): AppThunk => async (dispatch) => {
  try {
    // set loading
    dispatch(expensesLoading());
    // call to api
    const res = await axiosInstance.get(EXPENSES_ENDPOINT);
    // set the state
    dispatch(expensesLoaded(res.data.expenses));
  } catch (error) {
    dispatch(expensesLoadFailed(errorToMessage(error)));
  }
};
