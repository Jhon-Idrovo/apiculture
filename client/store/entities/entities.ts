import { combineReducers } from "@reduxjs/toolkit";
import albumsReducer from "./albums";
import hivesReducer from "./hives";
import expensesReducer from "./expenses";

export default combineReducers({
  albums: albumsReducer,
  hives: hivesReducer,
  expenses: expensesReducer,
});
