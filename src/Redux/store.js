import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/Reducer";
import { projectReducer } from "./Projects/Reducer";
import commentReducer from "./Comment/Reducer";
import issueReducer from "./issue/Reducer";
import subscriptionReducer from "./Subscription/Reducer";
const roorReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  comment: commentReducer,
  issue: issueReducer,
  subscription: subscriptionReducer,
});

export const store = legacy_createStore(roorReducer, applyMiddleware(thunk));
