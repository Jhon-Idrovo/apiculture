import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import axiosInstance from "../../config/axiosInstance";
import { HIVES_ENDPOTINT } from "../../config/config";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface IHive {
  _id: string;
  userID: string;
  name: string;
  installationDate: string;
  harvests: IHarvest[];
}
export declare interface IHarvest {
  date: string;
  amoutn: number;
}
export declare interface IHivesResponse {
  hives: IHive[];
}
const hivesInitialState = {
  loading: false,
  hivesList: [] as IHive[],
  error: "",
};

const hivesSlice = createSlice({
  name: "hives",
  initialState: hivesInitialState,
  reducers: {
    hivesLoading: (state, action) => {
      state.loading = true;
    },
    hivesLoaded: (state, action: PayloadAction<IHive[]>) => {
      console.log(action.payload);

      state.hivesList = action.payload;
      state.loading = false;
    },
    hivesLoadFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default hivesSlice.reducer;
const { hivesLoading, hivesLoadFailed, hivesLoaded } = hivesSlice.actions;

// FUNCTION ACTIONS
export const loadHives = (): AppThunk => async (dispatch) => {
  // set loading
  dispatch(hivesLoading);
  try {
    // call to the api
    const res = await axiosInstance.get(HIVES_ENDPOTINT);
    // update the state
    dispatch(hivesLoaded(res.data.hives));
  } catch (error) {
    console.log(error);

    dispatch(
      hivesLoadFailed(
        axios.isAxiosError(error)
          ? (error as AxiosError).response?.data.error.message
          : (error as Error).message
      )
    );
  }
};

function runAsyncAction(func: Function) {
  try {
  } catch (error) {}
}
