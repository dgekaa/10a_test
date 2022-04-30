import { combineReducers } from "redux";

import { basketReducer as basket } from "./basket";

export const reducers = combineReducers({
  basket,
});
