import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { combineReducers, createStore } from "redux";

//reducer
import ReducerA from "./reducerA";
import ReducerB from "./reducerB";

const rootReducer = combineReducers({
    AState: ReducerA,
    Bstate: ReducerB
});

// const rootReducer = (state: any, action: any) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload // apply delta from hydration
//         };
//         if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
//         return nextState;
//     } else {
//         return combinedReducer(state, action);
//     }
// };

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line no-unused-vars
const makeStore: MakeStore<RootState> = (context: Context) => createStore(rootReducer);
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
