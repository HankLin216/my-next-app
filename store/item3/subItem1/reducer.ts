import type { ActionType } from "./action";
import * as Action from "./action";

interface InitState {
    count: number;
}
const initState: InitState = {
    count: 0
};

const reducer = (state = initState, action: ActionType): InitState => {
    if(action.namespace !== Action.NAMESPACE ){
        return {...state};
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
        default:
            return state;
    }
};

export default reducer;
