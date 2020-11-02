import type { ActionType } from "./action";
import * as Action from "./action";

interface DrawerItemList {
    Label: string;
    to?: string;
    subList?: DrawerItemList[];
}

interface InitState {
    count: number;
    fetchData: DrawerItemList[];
}
const initState: InitState = {
    count: 0,
    fetchData: []
};

const reducer = (state = initState, action: ActionType): InitState => {
    if (action.namespace === undefined || action.namespace !== Action.NAMESPACE) {
        return { ...state };
    }
    switch (action.type) {
        case Action.ADD_COUNT:
            return {
                ...state,
                count: state.count + 1
            };
        case Action.SUBTRACT_COUNT:
            return {
                ...state,
                count: state.count - 1
            };
        case Action.FETCH_API_DATA_SUCCESS:
            return {
                ...state,
                fetchData: action.payload.data
            };
        default:
            return state;
    }
};

export default reducer;
