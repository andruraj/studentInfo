import { combineReducers } from "redux";
import studReducer from "./studReducer";

const rootReducer = combineReducers({
  student: studReducer
});

export default rootReducer;
