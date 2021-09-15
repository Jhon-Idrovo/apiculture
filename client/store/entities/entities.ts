import { combineReducers } from "@reduxjs/toolkit";
import albumsReducer from "./albums";
import hivesReducer from "./hives";

export default combineReducers({ albums: albumsReducer, hives: hivesReducer });
