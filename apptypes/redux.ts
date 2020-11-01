import { rootReducer } from "@store/index";

//redux
export type RootState = ReturnType<typeof rootReducer>;

//@para {string} N The type of namespace, it must be const string
export interface BaseAction<N, T> {
    namespace: N;
    type: T;
}
