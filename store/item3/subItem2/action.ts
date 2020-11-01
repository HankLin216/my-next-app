import { BaseAction } from "@apptypes/redux";
import { RootState } from "@apptypes/redux";
import { ThunkAction } from "redux-thunk";

export const NAMESPACE = "item3-subitem2";
export const ADD_COUNT = "ADD_COUNT";
export const SUBTRACT_COUNT = "SUBTRACT_COUNT";
export const FETCH_API_DATA_SUCCESS = "FETCH_API_DATA_SUCCESS";

type AddCount = BaseAction<typeof NAMESPACE, typeof ADD_COUNT>;
type SubstractCount = BaseAction<typeof NAMESPACE, typeof SUBTRACT_COUNT>;

interface DrawerItemList {
    Label: string;
    to?: string;
    subList?: DrawerItemList[];
}
interface FetchApiDataSuccess extends BaseAction<typeof NAMESPACE, typeof FETCH_API_DATA_SUCCESS> {
    payload: {
        data: DrawerItemList[];
    };
}

export type ActionType = AddCount | SubstractCount | FetchApiDataSuccess;

export const AddCountAction = (): ActionType => {
    return {
        namespace: NAMESPACE,
        type: ADD_COUNT
    };
};

export const SubstractCountAction = (): ActionType => {
    return {
        namespace: NAMESPACE,
        type: SUBTRACT_COUNT
    };
};

export const fecthSomething = (): ThunkAction<void, RootState, unknown, ActionType> => async (
    dispatch,
    getState
) => {
    const rootState = getState();
    const data: DrawerItemList[] = await fetch("/api/getDrawerProps").then((r) => r.json());
    dispatch({
        namespace: NAMESPACE,
        type: FETCH_API_DATA_SUCCESS,
        payload: {
            data
        }
    });
};
