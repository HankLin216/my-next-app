import { ActionType } from "./action";
import * as T from "./action";
interface InitState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const initState: InitState = {
    data: null
};

const reducer = (state = initState, action: ActionType): InitState => {
    if (action.namespace !== T.NAMESPACE) {
        return {
            ...state
        };
    }
    switch (action.type) {
        case T.SERVER_INIT_DATA:
            return {
                ...state,
                data: action.payload.data
            };
        default:
            return { ...state };
    }
};

export default reducer;
