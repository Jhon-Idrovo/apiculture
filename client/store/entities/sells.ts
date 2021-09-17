import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { SELLS_ENDPOINT } from "../../config/config";
import {
  compareRows,
  errorToMessage,
  Order,
  rowsMergeSort,
} from "../../utils/utils";
import { RootState } from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface ISell {
  // client:string,
  _id: string;
  userID: string;
  totalAmount: number;
  totalPrice: number;
  productID: string;
}
const sellsInitialState = {
  loading: false,
  error: "",
  list: [] as ISell[],
  sortBy: "" as keyof ISell,
  order: "asc" as Order,
  fields: [""],
};

const sellsSlice = createSlice({
  name: "sells",
  initialState: sellsInitialState,
  reducers: {
    sellsLoading: (sells, action: PayloadAction<boolean>) => {
      sells.loading = action.payload;
    },
    sellsLoaded: (sells, action: PayloadAction<ISell[]>) => {
      (sells.loading = false), (sells.list = action.payload);
      sells.error = "";
      sells.fields = Object.keys(action.payload[0]);
    },
    sellsLoadFailed: (sells, action: PayloadAction<string>) => {
      sells.loading = false;
      sells.error = action.payload;
    },
    sellsSort: (
      sells,
      action: PayloadAction<{ sortBy: keyof ISell; order: Order }>
    ) => {
      console.log(sells);
      const { sortBy, order } = action.payload;

      sells.list.sort(compareRows<ISell>(sortBy, order));
      sells.sortBy = sortBy;
      sells.order = order;
      sells.loading = false;
    },
  },
});

const { sellsLoading, sellsLoaded, sellsLoadFailed, sellsSort } =
  sellsSlice.actions;
export default sellsSlice.reducer;

// GETTERS
export const getSells = (state: RootState) => state.entities.sells;
// FUNCTION ACTIONS

export const loadSells = (): AppThunk => async (dispatch) => {
  dispatch(sellsLoading);
  try {
    const res = await axiosInstance.get(SELLS_ENDPOINT);
    dispatch(sellsLoaded(res.data.sells));
    dispatch(sortSells("_id"));
  } catch (error) {
    dispatch(sellsLoadFailed(errorToMessage(error)));
  }
};

export const sortSells =
  (sortBy: keyof ISell): AppThunk =>
  (dispatch, getState) => {
    dispatch(sellsLoading(true));
    const state = getState();
    const sells = state.entities.sells;
    // If we have the colum already sorted we only need to change the order.
    // Otherwise, start with ascendent
    const o: Order =
      sells.sortBy === sortBy
        ? sells.order === "asc"
          ? "desc"
          : "asc"
        : // start ascendent if sortBy is different
          "asc";
    dispatch(sellsSort({ sortBy, order: o }));
  };
