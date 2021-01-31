import { AnyAction } from "redux";

import type { ActionType } from "./action";
import * as Action from "./action";

export class InitState {
    productDescription: string | null = null;
}

const initState = new InitState();

const reducer = (state = initState, action: AnyAction & ActionType): InitState => {
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

export default reducer;
