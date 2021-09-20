import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { EXPENSES_ENDPOINT } from "../../config/config";
import { compareRows, errorToMessage, IField, Order } from "../../utils/utils";
import { RootState } from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";
import { getHiveById, IHive } from "./hives";

export declare interface IExpense {
  _id: string;
  hive?: Pick<IHive, "_id" | "name">;
  amount: number;
  description: string;
  date: string; // yy/mm/dd
}
const expensesInitialState = {
  loading: false,
  error: "",
  sortBy: "" as keyof IExpense,
  order: "asc" as Order,
  list: [] as IExpense[],
};
const expensesSlice = createSlice({
  name: "expenses",
  initialState: expensesInitialState,
  reducers: {
    expensesLoading: (expenses) => {
      expenses.loading = true;
    },
    expensesLoaded: (expenses, action: PayloadAction<IExpense[]>) => {
      expenses.list = action.payload;
      expenses.loading = false;
      expenses.error = "";
    },
    expensesLoadFailed: (expenses, action: PayloadAction<string>) => {
      expenses.error = action.payload;
      expenses.loading = false;
    },
    expensesSort: (
      expenses,
      action: PayloadAction<{ sortBy: keyof IExpense; order: Order }>
    ) => {
      const { sortBy, order } = action.payload;
      expenses.list.sort(compareRows<IExpense>(sortBy, order));
      expenses.sortBy = sortBy;
      expenses.order = order;
      expenses.loading = false;
    },
    expenseSaved: (expenses, action: PayloadAction<IExpense>) => {
      expenses.list.push(action.payload);
      expenses.loading = false;
    },
  },
});

const {
  expensesLoading,
  expensesLoaded,
  expensesLoadFailed,
  expensesSort,
  expenseSaved,
} = expensesSlice.actions;
export default expensesSlice.reducer;
// GET FUNCTIONS
export const getExpenes = (state: RootState) => state.entities.expenses;
// ACTION FUNCTIONS
export const loadExpenses = (): AppThunk => async (dispatch) => {
  try {
    // set loading
    dispatch(expensesLoading());
    // call to api
    const res = await axiosInstance.get(EXPENSES_ENDPOINT);
    // set the state
    dispatch(expensesLoaded(res.data.expenses));
    dispatch(sortExpenses("date"));
  } catch (error) {
    dispatch(expensesLoadFailed(errorToMessage(error)));
  }
};

export const sortExpenses =
  (sortBy: keyof IExpense): AppThunk =>
  (dispatch, getState) => {
    dispatch(expensesLoading());
    const state = getState();
    const expenses = state.entities.expenses;
    // If we have the colum already sorted we only need to change the order.
    // Otherwise, start with ascendent
    const o: Order =
      expenses.sortBy === sortBy
        ? expenses.order === "asc"
          ? "desc"
          : "asc"
        : // start ascendent if sortBy is different
          "asc";
    dispatch(expensesSort({ order: o, sortBy }));
  };
export const saveExpense =
  (
    amount: number,
    description: string,
    date: string | number,
    hive: string
  ): AppThunk =>
  async (dispatch) => {
    dispatch(expensesLoading());
    try {
      const r = await axiosInstance.post(EXPENSES_ENDPOINT + "/create", {
        amount,
        description,
        date: new Date(date).getTime(),
        hive: hive === "N/A" ? null : hive,
      });
      dispatch(expenseSaved(r.data.expense));
    } catch (error) {
      console.log(error);

      dispatch(expensesLoadFailed(errorToMessage(error)));
    }
  };
// UTILS
export declare type ExpensesMappingType = Record<
  keyof Omit<IExpense, "_id">,
  IField
>;
export const expensesKeyMapping: ExpensesMappingType = {
  amount: { header: "Amount", transform: (t: string) => "$ " + t } as IField,
  description: {
    header: "Description",
    transform: (t: string) => t,
  } as IField,
  date: {
    header: "Date",
    transform: (d: number) => new Date(d).toLocaleDateString(),
  } as IField,
  hive: {
    header: "Hive",
    transform: (hiveId: string) => (hiveId ? getHiveById(hiveId).name : "N/A"),
  } as IField,
};
