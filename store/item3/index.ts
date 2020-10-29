import { combineReducers } from "redux";

//reducer
import subItem1Reducer from "./subItem1/reducer";
import subItem2Reducer from "./subItem2/reducer";

const item3Reducer = combineReducers({
    subItem1State: subItem1Reducer,
    subItem2State: subItem2Reducer
});

export default item3Reducer;
