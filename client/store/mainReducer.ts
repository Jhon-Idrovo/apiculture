import { combineReducers } from "redux";
import UserReducer from "./user/user";

import entities from "./entities/entities";

export default combineReducers({
  user: UserReducer,
  entities: entities,
});
