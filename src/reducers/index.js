import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postReducer from './postReducer';
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  authReducer,
  postReducer,
  commentReducer,
});

export default rootReducer;
