export const ADD_COUNT = "ADD_COUNT";
export const SUBTRACT_COUNT = "SUBTRACT_COUNT";
interface AddCount {
    type: typeof ADD_COUNT;
}

interface SubstractCount {
    type: typeof SUBTRACT_COUNT;
}

export type ActionType = AddCount | SubstractCount;

export const AddCountAction = (): ActionType => {
    return {
        type: ADD_COUNT
    };
};

export const SubstractCountAction = (): ActionType => {
    return {
        type: SUBTRACT_COUNT
    };
};
