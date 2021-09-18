import { combineReducers } from "@reduxjs/toolkit";
import hivesReducer from "./hives";
import expensesReducer from "./expenses";
import sellsReducer from "./sells";

export default combineReducers({
  hives: hivesReducer,
  expenses: expensesReducer,
  sells: sellsReducer,
});
