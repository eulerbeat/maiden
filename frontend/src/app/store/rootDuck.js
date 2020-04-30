import { all } from "redux-saga/effects";
import { combineReducers } from "redux";

import * as auth from "./ducks/auth.duck";
import * as home from "./ducks/home.duck";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  home: home.reducer
});

export function* rootSaga() {
  yield all([auth.saga(), home.saga()]);
}
