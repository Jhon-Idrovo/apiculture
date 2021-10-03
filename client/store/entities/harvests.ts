import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance';
import { HARVESTS_ENDPOINT } from '../../config/config';
import { compareRows, errorToMessage, IField, Order, translate } from '../../utils/utils';
import { RootState } from '../configureStore';
import { AppThunk } from '../middleware/thunkMiddleware';
import { EntityStateType } from './expenses';
import { getHiveById } from './hives';
import { getProductById } from './products';

export declare interface IHarvest {
  _id: string;
  date: string;
  amount: number;
  product: string;
  hive: string;
}

const initialHarvests = {
  state: "init" as EntityStateType,
  list: [] as IHarvest[],
  sortBy: "",
  order: "" as Order,
  error: "",
};
const harvestSlice = createSlice({
  name: "harvests",
  initialState: initialHarvests,
  reducers: {
    harvestsLoading: (harvests, action: PayloadAction<EntityStateType>) => {
      harvests.state = action.payload;
    },
    harvestsLoaded: (harvests, action: PayloadAction<IHarvest[]>) => {
      harvests.list = action.payload;
      harvests.error = "";

      harvests.error = "";
      harvests.state = "loaded";
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
      harvests.state = "loaded";
    },
    harvestSaved: (harvests, action: PayloadAction<IHarvest>) => {
      harvests.list.push(action.payload);
      harvests.state = "saved";
    },
    harvestReestart: (harvests) => {
      harvests.error = "";
      harvests.state = "init";
    },
  },
});

export default harvestSlice.reducer;
const {
  harvestsLoading,
  harvestsLoadFailed,
  harvestsLoaded,
  harvestsSort,
  harvestSaved,
  harvestReestart,
} = harvestSlice.actions;

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
  dispatch(harvestsLoading("loading"));
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
export const saveHarvest =
  (
    amount: number | "",
    date: number | string,
    product: string,
    hive: string
  ): AppThunk =>
  async (dispatch) => {
    dispatch(harvestsLoading("saving"));
    try {
      if (!(amount && date && product && hive)) throw new Error("errMsg1");

      const res = await axiosInstance.post(HARVESTS_ENDPOINT + "/create", {
        amount,
        date: new Date(date).getTime(),
        product,
        hive,
      });
      dispatch(harvestSaved(res.data.harvest));
    } catch (error) {
      dispatch(harvestsLoadFailed(errorToMessage(error)));
    }
  };

export const sortHarvests =
  (sortBy: keyof IHarvest): AppThunk =>
  (dispatch, getState) => {
    dispatch(harvestsLoading("loading"));
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
export const harvestsToDefault = (): AppThunk => (dispatch) => {
  dispatch(harvestReestart());
};

// UTILS
export declare type HarvestsMappingType = Record<
  keyof Omit<IHarvest, "_id">,
  IField
>;

export const harvestKeyssMapping: HarvestsMappingType = {
  date: {
    header: translate("fecha"),
    transform: (date: number) => new Date(date).toLocaleDateString(),
  },
  amount: {
    header: translate("cantidad"),
    transform: (amount: number) => `${amount} L`,
  },
  // get the product name
  product: {
    header: translate("producto"),
    transform: (productID: string) => getProductById(productID).name,
  },
  // get the hive name
  hive: {
    header: translate("colmena"),
    transform: (hiveID: string) =>
      getHiveById(hiveID) ? getHiveById(hiveID).name : "N/A",
  },
};
