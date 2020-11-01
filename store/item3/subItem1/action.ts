import { BaseAction } from "@definition/types";

export const NAMESPACE = "item3-subitem1";
export const ADD_COUNT = "ADD_COUNT";
export const SUBTRACT_COUNT = "SUBTRACT_COUNT";

type AddCount = BaseAction<typeof NAMESPACE, typeof ADD_COUNT>;

type SubstractCount = BaseAction<typeof NAMESPACE, typeof SUBTRACT_COUNT>;

export type ActionType = AddCount | SubstractCount;

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
