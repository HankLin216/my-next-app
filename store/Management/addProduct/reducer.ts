import { combineReducers } from "redux";

import type { ActionType } from "./action";
import * as Action from "./action";

export class BasicInfoStateInitState {
    productDescription: string | null = null;
}

const initState = new BasicInfoStateInitState();

const basicInfoStateReducer = (state = initState, action: ActionType): BasicInfoStateInitState => {
    if (action.namespace === undefined || action.namespace !== Action.NAMESPACE) {
        return { ...state };
    }
    switch (action.type) {
        case Action.UPDATE_PRODUCT_DESCRIPTION_VALUE:
            return {
                ...state,
                productDescription: action.payload.value
            };
        default:
            return { ...state };
    }
};

//PriceQuantityInfo
class PriceQuantityInfoInitState {
    PriceTableData: any[] = [];
    QuantityTableData: any[] = [];
}

const priceQuantityInfoInitState = new PriceQuantityInfoInitState();

const priceQuantityInfoReducer = (state = priceQuantityInfoInitState, action: ActionType): PriceQuantityInfoInitState => {
    if (action.namespace === undefined || action.namespace !== Action.NAMESPACE) {
        return { ...state };
    }

    switch (action.type) {
        case Action.UPDATE_PRICE_TABLEDATA:
            return {
                ...state,
                PriceTableData: action.payload.tableData
            };
        case Action.UPDATE_QUANTITY_TABLEDATA:
            return {
                ...state,
                QuantityTableData: action.payload.tableData
            };
        default:
            return { ...state };
    }
};

export default combineReducers({
    BasicInfoState: basicInfoStateReducer,
    PriceQuantityInfoState: priceQuantityInfoReducer
});
