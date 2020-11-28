interface InitState {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const initState: InitState = {
    data: null
};

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        default:
            return { ...state };
    }
};

export default reducer;
