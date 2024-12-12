import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { Reducer as JobReducer } from "./jobs/job.reducer";

const rootReducer = combineReducers({
  JobReducer,
});
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
