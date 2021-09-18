import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import axiosInstance from "../../config/axiosInstance";
import { HIVES_ENDPOTINT } from "../../config/config";
import { compareRows, errorToMessage, Order } from "../../utils/utils";
import { RootState } from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface IHive {
  _id: string;
  userID: string;
  name: string;
  installationDate: string;
  harvests: IHarvest[];
}
export declare interface IHarvest {
  _id: string;
  date: string;
  amoutn: number;
}
export declare interface IHivesResponse {
  hives: IHive[];
}
const hivesInitialState = {
  fields: [""],
  sortBy: "",
  order: "" as Order,
  loading: false,
  list: [] as IHive[],
  error: "",
  activeHiveID: "",
};

const hivesSlice = createSlice({
  name: "hives",
  initialState: hivesInitialState,
  reducers: {
    hivesLoading: (state) => {
      state.loading = true;
    },
    hivesLoaded: (state, action: PayloadAction<IHive[]>) => {
      console.log(action.payload);

      state.list = action.payload;
      state.fields = Object.keys(action.payload[0]).filter(
        (key) => key !== "__v" && key !== "harvests" && key !== "userID"
      );
      state.activeHiveID = action.payload[0]._id;
      state.error = "";
      state.loading = false;
    },
    hivesLoadFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    hivesSort: (
      hives,
      action: PayloadAction<{ sortBy: keyof IHive; order: Order }>
    ) => {
      const { sortBy, order } = action.payload;
      hives.order = order;
      hives.sortBy = sortBy;
      hives.list.sort(compareRows<IHive>(sortBy, order));
      hives.loading = false;
    },
    setHive: (hives, action: PayloadAction<string>) => {
      hives.activeHiveID = action.payload;
      hives.loading = false;
    },
  },
});

export default hivesSlice.reducer;
const { hivesLoading, hivesLoadFailed, hivesLoaded, hivesSort, setHive } =
  hivesSlice.actions;
// SELECTORS
export const getHives = (state: RootState) => state.entities.hives;
export const getProductionFromHive = (hiveId: string) => (state: RootState) =>
  state.entities.hives.list.find((hive) => hive._id === hiveId)?.harvests;
// FUNCTION ACTIONS
export const loadHives = (): AppThunk => async (dispatch) => {
  // set loading
  dispatch(hivesLoading());
  try {
    // call to the api
    const res = await axiosInstance.get(HIVES_ENDPOTINT);
    // update the state
    dispatch(hivesLoaded(res.data.hives));
    dispatch(sortHives("installationDate"));
  } catch (error) {
    console.log(error);

    dispatch(hivesLoadFailed(errorToMessage(error)));
  }
};

export const sortHives =
  (sortBy: keyof IHive): AppThunk =>
  (dispatch, getState) => {
    dispatch(hivesLoading());
    const state = getState();
    const hives = state.entities.hives;
    // If we have the colum already sorted we only need to change the order.
    // Otherwise, start with ascendent
    const o: Order =
      hives.sortBy === sortBy
        ? hives.order === "asc"
          ? "desc"
          : "asc"
        : // start ascendent if sortBy is different
          "asc";
    dispatch(hivesSort({ order: o, sortBy }));
  };

function runAsyncAction(func: Function) {
  try {
  } catch (error) {}
}

export const changeActiveHive =
  (hiveID: string): AppThunk =>
  (dispatch) => {
    dispatch(hivesLoading());
    dispatch(setHive(hiveID));
  };
