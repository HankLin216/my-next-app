import { combineReducers } from "redux";

import addProductReducer from "./addProduct/reducer";

const ManagementState = combineReducers({
    addProductState: addProductReducer
});

export default ManagementState;
