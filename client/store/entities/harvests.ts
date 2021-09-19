import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosInstance";
import { HARVESTS_ENDPOINT } from "../../config/config";
import { compareRows, errorToMessage, Order } from "../../utils/utils";
import { RootState } from "../configureStore";
import { AppThunk } from "../middleware/thunkMiddleware";
import { getHiveById, IHive } from "./hives";
import { getProductById, IProduct } from "./products";

export declare interface IHarvest {
  _id: string;
  date: string;
  amount: number;
  product: string;
  hive: string;
}
export const harvestPropsMapping = {
  date: {
    header: "Date",
    transform: (date: number) => new Date(date).toLocaleDateString(),
  },
  amount: { header: "Amount", transform: (amount: number) => `${amount} L` },
  // get the product name
  product: {
    header: "Product",
    transform: (productID: string) => getProductById(productID).name,
  },
  // get the hive name
  hive: {
    header: "Hive",
    transform: (hiveID: string) => getHiveById(hiveID).name,
  },
};

const initialHarvests = {
  loading: false,
  list: [] as IHarvest[],
  fields: harvestPropsMapping,
  sortBy: "",
  order: "" as Order,
  error: "",
};
const harvestSlice = createSlice({
  name: "harvests",
  initialState: initialHarvests,
  reducers: {
    harvestsLoading: (harvests) => {
      harvests.loading = true;
    },
    harvestsLoaded: (harvests, action: PayloadAction<IHarvest[]>) => {
      harvests.list = action.payload;
      harvests.error = "";

      harvests.error = "";
      harvests.loading = false;
    },
    harvestsLoadFailed: (harvests, action: PayloadAction<string>) => {
      harvests.error = action.payload;
    },
    harvestsSort: (
      harvests,
      action: PayloadAction<{ sortBy: keyof IHarvest; order: Order }>
    ) => {
      const { sortBy, order } = action.payload;
      harvests.sortBy = sortBy;
      harvests.order = order;
      harvests.list.sort(compareRows<IHarvest>(sortBy, order));
      harvests.loading = false;
    },
  },
});

export default harvestSlice.reducer;
const { harvestsLoading, harvestsLoadFailed, harvestsLoaded, harvestsSort } =
  harvestSlice.actions;

// SELECTORS
export const getHarvests = (state: RootState) => {
  const selectedHive = state.entities.hives.activeHiveID;
  return selectedHive
    ? {
        ...state.entities.harvests,
        list: state.entities.harvests.list.filter(
          (harvest) => harvest.hive === selectedHive
        ),
      }
    : state.entities.harvests;
};
// FUNCTION ACTIONS
export const loadHarvests = (): AppThunk => async (dispatch) => {
  // set loading
  dispatch(harvestsLoading());
  try {
    // call to the api
    const res = await axiosInstance.get(HARVESTS_ENDPOINT);
    // update the state
    dispatch(harvestsLoaded(res.data.harvests));
    dispatch(sortHarvests("date"));
  } catch (error) {
    console.log(error);

    dispatch(harvestsLoadFailed(errorToMessage(error)));
  }
};

export const sortHarvests =
  (sortBy: keyof IHarvest): AppThunk =>
  (dispatch, getState) => {
    dispatch(harvestsLoading());
    const state = getState();
    const harvests = state.entities.harvests;
    // If we have the colum already sorted we only need to change the order.
    // Otherwise, start with ascendent
    const o: Order =
      harvests.sortBy === sortBy
        ? harvests.order === "asc"
          ? "desc"
          : "asc"
        : // start ascendent if sortBy is different
          "asc";
    dispatch(harvestsSort({ order: o, sortBy }));
  };
// UTILS
//TODO:Implement this
