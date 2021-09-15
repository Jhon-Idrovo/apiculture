import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { SELLS_ENDPOINT } from "../../config/config";
import { errorToMessage } from "../../utils/utils";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface ISell {
  // client:string,
  userID: string;
  amount: number;
  productID: string;
}
const sellsInitialState = {
  loading: false,
  error: "",
  sellsList: [] as ISell[],
};

const sellsSlice = createSlice({
  name: "sells",
  initialState: sellsInitialState,
  reducers: {
    sellsLoading: (sells) => {
      sells.loading = true;
    },
    sellsLoaded: (sells, action: PayloadAction<ISell[]>) => {
      (sells.loading = false), (sells.sellsList = action.payload);
      sells.error = "";
    },
    sellsLoadFailed: (sells, action: PayloadAction<string>) => {
      sells.loading = false;
      sells.error = action.payload;
    },
  },
});

const { sellsLoading, sellsLoaded, sellsLoadFailed } = sellsSlice.actions;
export default sellsSlice.reducer;

// FUNCTION ACTIONS

export const loadSells = (): AppThunk => async (dispatch) => {
  dispatch(sellsLoading);
  try {
    const res = await axiosInstance.get(SELLS_ENDPOINT);
    dispatch(sellsLoaded(res.data.sells));
  } catch (error) {
    dispatch(sellsLoadFailed(errorToMessage(error)));
  }
};
