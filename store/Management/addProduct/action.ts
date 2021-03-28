import { BaseAction } from "@apptypes/redux";

export const NAMESPACE = "Management-addProduct";

export const UPDATE_PRODUCT_DESCRIPTION_VALUE = "UPDATE_PRODUCT_DESCRIPTION_VALUE";
export const UPDATE_PRICE_TABLEDATA = "UPDATE_PRICE_TABLEDATA";
export const UPDATE_QUANTITY_TABLEDATA = "UPDATE_QUANTITY_TABLEDATA";

type Update_Product_Description = BaseAction<typeof NAMESPACE, typeof UPDATE_PRODUCT_DESCRIPTION_VALUE> & {
    payload: {
        value: string;
    };
};

type Update_Price_TableData = BaseAction<typeof NAMESPACE, typeof UPDATE_PRICE_TABLEDATA> & {
    payload: {
        tableData: any[];
    };
};

type Update_Quantity_TableData = BaseAction<typeof NAMESPACE, typeof UPDATE_QUANTITY_TABLEDATA> & {
    payload: {
        tableData: any[];
    };
};

export type ActionType = Update_Product_Description | Update_Price_TableData | Update_Quantity_TableData;

export function UpdateProductDescriptionAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_DESCRIPTION_VALUE,
        payload: {
            value
        }
    };
}

export function UpdatePriceTableDataAction(tableData: any[]): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRICE_TABLEDATA,
        payload: {
            tableData
        }
    };
}

export function UpdateQuantityTableDataAction(tableData: any[]): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_QUANTITY_TABLEDATA,
        payload: {
            tableData
        }
    };
}
