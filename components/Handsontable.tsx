import "../node_modules/handsontable/dist/handsontable.full.css";

import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";
import React, { ReactElement } from "react";

interface PropsType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    forwardedRef: any;
}
const compareFun = (HeadrNames: string[]) => (
    sortOrder: Handsontable.columnSorting.SortOrderType,
    columnMeta: Handsontable.GridSettings
) => (value: string, nextValue: string) => {
    const a = columnMeta;
    if (sortOrder === "asc") {
        if (HeadrNames.includes(value)) return -1;
        if (value > nextValue) return 1;
        else return -1;
    } else {
        if (HeadrNames.includes(value)) return -1;
        if (value < nextValue) return 1;
        else return -1;
    }
};
// eslint-disable-next-line react/display-name
const MyHandsontable = (props: PropsType): ReactElement => {
    return (
        <HotTable
            ref={props.forwardedRef}
            data={props.data}
            colHeaders={true}
            rowHeaders={true}
            columns={[
                {
                    multiColumnSorting: {
                        indicator: true,
                        headerAction: true,
                        compareFunctionFactory: compareFun([
                            "",
                            "Tesla",
                            "Mercedes",
                            "Toyota",
                            "Volvo"
                        ])
                    }
                },
                {
                    multiColumnSorting: {
                        compareFunctionFactory: compareFun([
                            "",
                            "Tesla",
                            "Mercedes",
                            "Toyota",
                            "Volvo"
                        ])
                    }
                },
                {
                    multiColumnSorting: {
                        compareFunctionFactory: compareFun([
                            "",
                            "Tesla",
                            "Mercedes",
                            "Toyota",
                            "Volvo"
                        ])
                    }
                },
                {
                    multiColumnSorting: {
                        compareFunctionFactory: compareFun([
                            "",
                            "Tesla",
                            "Mercedes",
                            "Toyota",
                            "Volvo"
                        ])
                    }
                },
                {
                    multiColumnSorting: {
                        compareFunctionFactory: compareFun([
                            "",
                            "Tesla",
                            "Mercedes",
                            "Toyota",
                            "Volvo"
                        ])
                    }
                }
            ]}
            contextMenu={{
                items: {
                    row_above: {
                        name: "插入上一列"
                    },
                    row_below: {
                        name: "插入下一列"
                    },
                    col_left: {
                        name: "插入左方欄"
                    },
                    col_right: {
                        name: "插入右方欄"
                    }
                }
            }}
            dropdownMenu={true}
            filters={true}
            // columnSorting={{
            //     compareFunctionFactory: compareFun(["", "Tesla", "Mercedes", "Toyota", "Volvo"])
            // }}
            multiColumnSorting={true}
            // multiColumnSorting={{
            //     compareFunctionFactory: compareFun(["", "Tesla", "Mercedes", "Toyota", "Volvo"])
            // }}
            licenseKey="non-commercial-and-evaluation"></HotTable>
    );
};
export default MyHandsontable;
