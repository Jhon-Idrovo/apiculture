import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance';
import { PRODUCTS_ENDPOINT } from '../../config/config';
import { errorToMessage, IField, Order, translate } from '../../utils/utils';
import store, { RootState } from '../configureStore';
import { AppThunk } from '../middleware/thunkMiddleware';
import { EntityStateType } from './expenses';

export declare interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  imgUri?: string;
}
export const productsInitialState = {
  state: "init" as EntityStateType,
  error: "",
  list: [] as IProduct[],

  sortBy: "",
  order: "" as Order,
};
const productsSlice = createSlice({
  name: "products",
  initialState: productsInitialState,
  reducers: {
    prodsLoading: (products, action: PayloadAction<EntityStateType>) => {
      products.state = action.payload;
    },
    prodsLoaded: (products, action: PayloadAction<IProduct[]>) => {
      products.list = action.payload;
      products.error = "";
      products.state = "init";
    },
    prodsLoadFailed: (products, action: PayloadAction<string>) => {
      products.error = action.payload;
      products.state = "load-failed";
    },
    prodSaved: (producst, action: PayloadAction<IProduct>) => {
      producst.list.push(action.payload);
      producst.state = "saved";
    },
    prodsReestart: (products) => {
      products.state = "init";
      products.error = "";
    },
  },
});

export default productsSlice.reducer;
const { prodsLoadFailed, prodsLoaded, prodsLoading, prodSaved, prodsReestart } =
  productsSlice.actions;

// SELECTORS
export const getProducts = (state: RootState) => state.entities.products;
// FUNCTION ACTIONS
export const loadProducts = (): AppThunk => async (dispatch) => {
  dispatch(prodsLoading("loading"));
  try {
    const res = await axiosInstance.get(PRODUCTS_ENDPOINT);
    dispatch(prodsLoaded(res.data.products));
  } catch (error) {
    dispatch(prodsLoadFailed(errorToMessage(error)));
  }
};
export const saveProduct =
  (name: string, price: number | "", description: string): AppThunk =>
  async (dispatch) => {
    dispatch(prodsLoading("saving"));
    try {
      if (!(name && price && description)) throw new Error("errMsg01");

      const r = await axiosInstance.post(PRODUCTS_ENDPOINT + "/create", {
        name,
        price,
        description,
      });
      dispatch(prodSaved(r.data.product));
    } catch (error) {
      console.log(error);

      dispatch(prodsLoadFailed(errorToMessage(error)));
    }
  };

export const productsToDefault = (): AppThunk => (dispatch) => {
  dispatch(prodsReestart());
};
// UTILS
export const getProductById = (id: string): IProduct => {
  const state = store.getState();
  return state.entities.products.list.filter(
    (product) => product._id === id
  )[0];
};

export declare type SellsMappingType = Record<
  keyof Omit<IProduct, "_id">,
  IField
>;

export const productsKeysMapping = {
  name: {
    header: translate("nombre"),
    transform: (name: string) => name,
  } as IField,
  description: {
    header: translate("descripcion"),
    transform: (description: string) => description,
  } as IField,
  price: {
    header: translate("precio"),
    transform: (price: string) => "$ " + price,
  } as IField,
};
