import { BaseAction } from "@apptypes/redux";

export const NAMESPACE = "Management-addProduct";

export const UPDATE_PRODUCT_DESCRIPTION_VALUE = "UPDATE_PRODUCT_DESCRIPTION_VALUE";
export const UPDATE_PRODUCT_NAME = "UPDATE_PRODUCT_NAME";
export const UPDATE_PRODUCT_SERIES = "UPDATE_PRODUCT_SERIES";
export const UPDATE_PRODUCT_ID = "UPDATE_PRODUCT_ID";
export const UPDATE_PRODUCT_CATEGORY = "UPDATE_PRODUCT_CATEGORY";

export const UPDATE_PRICE_TABLEDATA = "UPDATE_PRICE_TABLEDATA";
export const UPDATE_QUANTITY_TABLEDATA = "UPDATE_QUANTITY_TABLEDATA";

type Update_Product_Description = BaseAction<typeof NAMESPACE, typeof UPDATE_PRODUCT_DESCRIPTION_VALUE> & {
    payload: {
        value: string;
    };
};

type Update_Produc_Name = BaseAction<typeof NAMESPACE, typeof UPDATE_PRODUCT_NAME> & {
    payload: {
        value: string;
    };
};

type Update_Produc_Series = BaseAction<typeof NAMESPACE, typeof UPDATE_PRODUCT_SERIES> & {
    payload: {
        value: string;
    };
};

type Update_Produc_ID = BaseAction<typeof NAMESPACE, typeof UPDATE_PRODUCT_ID> & {
    payload: {
        value: string;
    };
};

type Update_Produc_Category = BaseAction<typeof NAMESPACE, typeof UPDATE_PRODUCT_CATEGORY> & {
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

export type ActionType =
    | Update_Product_Description
    | Update_Price_TableData
    | Update_Quantity_TableData
    | Update_Produc_Name
    | Update_Produc_Series
    | Update_Produc_ID
    | Update_Produc_Category;

export function UpdateProductDescriptionAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_DESCRIPTION_VALUE,
        payload: {
            value
        }
    };
}

export function UpdateProductNameAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_NAME,
        payload: {
            value
        }
    };
}
export function UpdateProductSeriesAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_SERIES,
        payload: {
            value
        }
    };
}
export function UpdateProductIDAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_ID,
        payload: {
            value
        }
    };
}
export function UpdateProductCategoryAction(value: string): ActionType {
    return {
        namespace: NAMESPACE,
        type: UPDATE_PRODUCT_CATEGORY,
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
