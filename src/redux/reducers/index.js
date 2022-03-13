import { combineReducers } from "redux";
import movie from "./movie";

const rootReducer = combineReducers({
  movie: movie,
});

export default rootReducer;
