import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

interface IinitBState {
    times: number;
}

const initAState: IinitBState = {
    times: 0
};

const BReducer = (state = initAState, action: AnyAction): IinitBState => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export default BReducer;
