import { combineReducers } from "@reduxjs/toolkit";
import albumsReducer from "./albums";
import hivesReducer from "./hives";
import expensesReducer from "./expenses";
import sellsReducer from "./sells";

export default combineReducers({
  albums: albumsReducer,
  hives: hivesReducer,
  expenses: expensesReducer,
  sells: sellsReducer,
});
