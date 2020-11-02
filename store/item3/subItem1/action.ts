import { BaseAction } from "@apptypes/redux";

export const NAMESPACE = "item3-subitem1";
export const ADD_COUNT = "ADD_COUNT";
export const SUBTRACT_COUNT = "SUBTRACT_COUNT";
export const SERVERSID_ADD_COUNT = "SERVERSID_ADD_COUNT";

type AddCount = BaseAction<typeof NAMESPACE, typeof ADD_COUNT>;

type SubstractCount = BaseAction<typeof NAMESPACE, typeof SUBTRACT_COUNT>;

type ServerSideAddCount = BaseAction<typeof NAMESPACE, typeof SERVERSID_ADD_COUNT>;

export type ActionType = AddCount | SubstractCount | ServerSideAddCount;

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

export const ServerSideAddCountAction = (): ActionType => {
    return {
        namespace: NAMESPACE,
        type: SERVERSID_ADD_COUNT
    };
};
