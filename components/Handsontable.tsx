import "../node_modules/handsontable/dist/handsontable.full.css";

import { HotTable } from "@handsontable/react";
import React, { ReactElement } from "react";

interface PropsType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const Handsontable = (props: PropsType): ReactElement => {
    return (
        <HotTable
            data={props.data}
            colHeaders={true}
            rowHeaders={true}
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
            columnSorting
            licenseKey="non-commercial-and-evaluation"></HotTable>
    );
};

export default Handsontable;
