import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { HIVES_ENDPOINT } from "../../config/config";
import { compareRows, errorToMessage, IField, Order } from "../../utils/utils";
import store, { RootState } from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";

export declare interface IHive {
  _id: string;
  userID: string;
  name: string;
  installationDate: string;
  totalHarvests: number;
}

export declare interface IHivesResponse {
  hives: IHive[];
}
const hivesInitialState = {
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
      // state.activeHiveID = action.payload[0]._id;
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
// FUNCTION ACTIONS
export const loadHives = (): AppThunk => async (dispatch) => {
  // set loading
  dispatch(hivesLoading());
  try {
    // call to the api
    const res = await axiosInstance.get(HIVES_ENDPOINT);
    // update the state
    dispatch(hivesLoaded(res.data.hives));
    dispatch(sortHives("totalHarvests"));
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

export const changeActiveHive =
  (hiveID: string): AppThunk =>
  (dispatch) => {
    dispatch(hivesLoading());
    dispatch(setHive(hiveID));
  };

// UTILS
export const getHiveById = (id: string): IHive => {
  const state: RootState = store.getState();
  return state.entities.hives.list.filter((hive: IHive) => hive._id === id)[0];
};

export declare type SellsMappingType = Record<keyof Omit<IHive, "_id">, IField>;

export const hivesKeysMapping = {
  name: { header: "Name", transform: (t: string) => t } as IField,
  installationDate: {
    header: "Installated At",
    transform: (d: string) => new Date(d).toLocaleDateString(),
  } as IField,
  totalHarvests: { header: "Name", transform: (t: string) => t } as IField,
};
