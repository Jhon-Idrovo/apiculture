import { combineReducers } from "@reduxjs/toolkit";
import hivesReducer from "./hives";
import expensesReducer from "./expenses";
import sellsReducer from "./sells";
import harvestReducer from "./harvests";
import productsReducer from "./products";

export default combineReducers({
  hives: hivesReducer,
  expenses: expensesReducer,
  sells: sellsReducer,
  harvests: harvestReducer,
  products: productsReducer,
});
