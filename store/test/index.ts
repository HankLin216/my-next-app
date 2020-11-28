import { combineReducers } from "redux";

//reducer
import MyHandsontableReducer from "./MyHandsontable/reducer";

const testReducer = combineReducers({
    MyHandsontableState: MyHandsontableReducer
});

export default testReducer;
