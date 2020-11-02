import { RootState } from "@apptypes/redux";
import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

import type { ActionType } from "./action";
import * as Action from "./action";

interface InitState {
    count: number;
    server: {
        count: number;
    };
}
const initState: InitState = {
    count: 0,
    server: {
        count: 0
    }
};

const reducer = (state = initState, action: ActionType & AnyAction): InitState => {
    if (action.type === HYDRATE) {
        const _s = (action.payload as RootState).item3State.subItem1State.server.count;
        return {
            ...state,
            server: {
                ...state.server,
                count: (action.payload as RootState).item3State.subItem1State.server.count
            }
        };
    }
    if (action.namespace === undefined || action.namespace !== Action.NAMESPACE) {
        return { ...state };
    }
    switch (action.type) {
        //server
        case Action.SERVERSID_ADD_COUNT:
            return {
                ...state,
                server: {
                    count: state.server.count + 1
                }
            };
        //client
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
