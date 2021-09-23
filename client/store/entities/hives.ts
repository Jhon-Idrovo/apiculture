import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import axiosInstance from '../../config/axiosInstance';
import { HIVES_ENDPOINT } from '../../config/config';
import { compareRows, errorToMessage, IField, Order, translate } from '../../utils/utils';
import store, { RootState } from '../configureStore';
import { AppThunk } from '../middleware/thunkMiddleware';
import { EntityStateType } from './expenses';

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
  state: "init" as EntityStateType,
  list: [] as IHive[],
  error: "",
  activeHiveID: "",
};

const hivesSlice = createSlice({
  name: "hives",
  initialState: hivesInitialState,
  reducers: {
    hivesLoading: (state, action: PayloadAction<EntityStateType>) => {
      state.state = action.payload;
    },
    hivesLoaded: (state, action: PayloadAction<IHive[]>) => {
      console.log(action.payload);

      state.list = action.payload;
      // state.activeHiveID = action.payload[0]._id;
      state.error = "";
      state.state = "loaded";
    },
    hivesLoadFailed: (state, action: PayloadAction<string>) => {
      state.state = "load-failed";
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
      hives.state = "init";
    },
    setHive: (hives, action: PayloadAction<string>) => {
      hives.activeHiveID = action.payload;
      hives.state = "init";
    },
    hiveSaved: (hives, action: PayloadAction<IHive>) => {
      hives.list.push(action.payload);
      hives.state = "saved";
    },
    hivesRestart: (hives) => {
      hives.state = "init";
      hives.error = "";
    },
  },
});

export default hivesSlice.reducer;
const {
  hivesLoading,
  hivesLoadFailed,
  hivesLoaded,
  hivesSort,
  setHive,
  hiveSaved,
  hivesRestart,
} = hivesSlice.actions;
// SELECTORS
export const getHives = (state: RootState) => state.entities.hives;
// FUNCTION ACTIONS
export const loadHives = (): AppThunk => async (dispatch) => {
  // set loading
  dispatch(hivesLoading("loading"));
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
    dispatch(hivesLoading("loading"));
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
    dispatch(hivesLoading("loading"));
    dispatch(setHive(hiveID));
  };
export const saveHive =
  (name: string, date: string | number): AppThunk =>
  async (dispatch) => {
    dispatch(hivesLoading("saving"));
    try {
      if (!(name && date)) throw new Error("errMsg1");

      const r = await axiosInstance.post(HIVES_ENDPOINT + "/create", {
        date: new Date(date).getTime(),
        name,
      });
      dispatch(hiveSaved(r.data.hive));
    } catch (error) {
      dispatch(hivesLoadFailed(errorToMessage(error)));
    }
  };
export const hivesToDefault = (): AppThunk => (dispatch) => {
  dispatch(hivesRestart());
};
// UTILS
export const getHiveById = (id: string): IHive => {
  const state: RootState = store.getState();
  return state.entities.hives.list.filter((hive: IHive) => hive._id === id)[0];
};

export declare type SellsMappingType = Record<keyof Omit<IHive, "_id">, IField>;

export const hivesKeysMapping = {
  name: { header: translate("nombre"), transform: (t: string) => t } as IField,
  installationDate: {
    header: translate("fechaInstalacion"),
    transform: (d: string) => new Date(d).toLocaleDateString(),
  } as IField,
  totalHarvests: {
    header: translate("cosecha"),
    transform: (t: string) => t,
  } as IField,
};
