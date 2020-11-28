import { BaseAction } from "@apptypes/redux";

export const NAMESPACE = "MyHandsontable";
export const SERVER_INIT_DATA = "SERVER_INIT_DATA";

interface ServerInitData extends BaseAction<typeof NAMESPACE, typeof SERVER_INIT_DATA> {
    payload: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: any;
    };
}

export type ActionType = ServerInitData;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const ServerInitDataAction = (data: any): ActionType => {
    return {
        namespace: NAMESPACE,
        type: SERVER_INIT_DATA,
        payload: {
            data
        }
    };
};
