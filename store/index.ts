import { Context, createWrapper, HYDRATE, MakeStore } from "next-redux-wrapper";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

//reducer
import managementReducer from "./Management";
import testReducer from "./test";

export const rootReducer = combineReducers({
    testState: testReducer,
    managementState: managementReducer
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

type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line no-unused-vars
const makeStore: MakeStore<RootState> = (context: Context) =>
    createStore(rootReducer, applyMiddleware(thunk));
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });
