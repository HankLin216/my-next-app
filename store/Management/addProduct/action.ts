import { BaseAction } from "@apptypes/redux";

export const NAMESPACE = "Management-addProduct";
export const UPDATE_PRODUCT_DESCRIPTION_VALUE = "UPDATE_PRODUCT_DESCRIPTION_VALUE";

type Update_Product_Description = BaseAction<
    typeof NAMESPACE,
    typeof UPDATE_PRODUCT_DESCRIPTION_VALUE
> & {
    payload: {
        value: string;
    };
};

export type ActionType = Update_Product_Description;

export function UpdateProductDescriptionAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_DESCRIPTION_VALUE,
        payload: {
            value
        }
    };
}
