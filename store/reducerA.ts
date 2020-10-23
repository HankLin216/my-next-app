import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";

interface IinitAState {
    count: number;
}

const initAState: IinitAState = {
    count: 0
};

const AReducer = (state = initAState, action: AnyAction): IinitAState => {
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload };
        case "Hello":
            return { ...state, count: state.count + 1 };
        default:
            return state;
    }
};

export default AReducer;
