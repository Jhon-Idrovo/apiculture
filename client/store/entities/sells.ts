import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance';
import { SELLS_ENDPOINT } from '../../config/config';
import { compareRows, errorToMessage, IField, Order, translate } from '../../utils/utils';
import { RootState } from '../configureStore';
import { AppThunk } from '../middleware/thunkMiddleware';
import { EntityStateType } from './expenses';
import { getProductById, IProduct } from './products';

export declare interface ISell {
  // client:string,
  _id: string;
  totalAmount: number;
  totalPrice: number;
  productID: Pick<IProduct, "name" | "_id">;
  date: number;
}
export const sellsKeysToHeaders = {
  _id: "id",
  totalAmount: "Total Amount",
  totalPrice: "Income",
  productID: "Procduct",
};
const sellsInitialState = {
  state: "init" as EntityStateType,
  error: "",
  list: [] as ISell[],
  sortBy: "" as keyof ISell,
  order: "asc" as Order,
};

const sellsSlice = createSlice({
  name: "sells",
  initialState: sellsInitialState,
  reducers: {
    sellsLoading: (sells, action: PayloadAction<EntityStateType>) => {
      sells.state = action.payload;
    },
    sellsLoaded: (sells, action: PayloadAction<ISell[]>) => {
      sells.state = "init";
      sells.list = action.payload;
      sells.error = "";
    },
    sellsLoadFailed: (sells, action: PayloadAction<string>) => {
      sells.state = "load-failed";
      sells.error = action.payload;
    },
    sellsSort: (
      sells,
      action: PayloadAction<{ sortBy: keyof ISell; order: Order }>
    ) => {
      const { sortBy, order } = action.payload;

      sells.list.sort(compareRows<ISell>(sortBy, order));
      sells.sortBy = sortBy;
      sells.order = order;
      sells.state = "init";
    },
    sellSaved: (sells, action: PayloadAction<ISell>) => {
      sells.list.push(action.payload);
      sells.state = "saved";
    },
    sellsReestart: (sells) => {
      sells.error = "";
      sells.state = "init";
    },
  },
});

const {
  sellsLoading,
  sellsLoaded,
  sellsLoadFailed,
  sellsSort,
  sellSaved,
  sellsReestart,
} = sellsSlice.actions;
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
    dispatch(sellsLoading("loading"));
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
export const saveSell =
  (
    amount: number | "",
    price: number | "",
    date: string | number,
    productID: string | ""
  ): AppThunk =>
  async (dispatch) => {
    dispatch(sellsLoading("saving"));
    try {
      if (!(amount && price && date && productID))
        throw new Error("Please fill all the fields");
      const r = await axiosInstance.post(SELLS_ENDPOINT + "/create", {
        totalAmount: amount,
        totalPrice: price,
        productID,
        date,
      });
      dispatch(sellSaved(r.data.sell));
    } catch (error) {
      console.log(error);
      dispatch(sellsLoadFailed(errorToMessage(error)));
    }
  };

export const sellsToDefault = (): AppThunk => (dispatch) => {
  dispatch(sellsReestart());
};
// UTILS

export declare type SellsMappingType = Record<keyof Omit<ISell, "_id">, IField>;

export const sellsKeyMapping: SellsMappingType = {
  totalAmount: {
    header: translate("cantidad"),
    transform: (t: string) => t + " ml",
  } as IField,
  totalPrice: {
    header: translate("ingreso"),
    transform: (t: string) => "$ " + t,
  } as IField,
  productID: {
    header: translate("producto"),
    transform: (t: string) => getProductById(t).name,
  } as IField,
  date: {
    header: translate("fecha"),
    transform: (d: number) => new Date(d).toLocaleDateString(),
  } as IField,
};
