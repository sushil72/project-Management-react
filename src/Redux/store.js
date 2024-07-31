import { legacy_createStore , applyMiddleware, combineReducers,} from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import {projectReducer} from "./Projects/Reducer";
const roorReducer=combineReducers({
  auth:authReducer,
  project:projectReducer
});

export const store=legacy_createStore(roorReducer,applyMiddleware(thunk));