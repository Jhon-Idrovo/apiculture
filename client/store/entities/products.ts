import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { PRODUCTS_ENDPOINT } from "../../config/config";
import { errorToMessage, IField, Order } from "../../utils/utils";
import store from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  imgUri?: string;
}
export const productsInitialState = {
  loading: false,
  error: "",
  list: [] as IProduct[],
  fields: {
    name: { header: "Name", transform: (name: string) => name } as IField,
    description: {
      header: "Description",
      transform: (description: string) => description,
    } as IField,
    price: {
      header: "Price",
      transform: (price: string) => "$ " + price,
    } as IField,
  },
  sortBy: "",
  order: "" as Order,
};
const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    prodsLoading: (products, action: PayloadAction<boolean>) => {
      products.loading = action.payload;
    },
    prodsLoaded: (products, action: PayloadAction<IProduct[]>) => {
      products.list = action.payload;
      products.error = "";
      products.loading = false;
    },
    prodsLoadFailed: (products, action: PayloadAction<string>) => {
      products.error = action.payload;
      products.loading = false;
    },
  },
});

export default productsSlice.reducer;
const { prodsLoadFailed, prodsLoaded, prodsLoading } = productsSlice.actions;

// SELECTORS

// FUNCTION ACTIONS
export const loadProducts = (): AppThunk => async (dispatch) => {
  dispatch(prodsLoading(true));
  try {
    const res = await axiosInstance.get(PRODUCTS_ENDPOINT);
    dispatch(prodsLoaded(res.data.products));
  } catch (error) {
    dispatch(prodsLoadFailed(errorToMessage(error)));
  }
};
// UTILS
export const getProductById = (id: string): IProduct => {
  const state = store.getState();
  return state.entities.products.list.filter(
    (product) => product._id === id
  )[0];
};
