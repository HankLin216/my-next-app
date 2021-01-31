/* eslint-disable react/jsx-key */
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@material-ui/core";
import Layout from "components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React, { ReactElement } from "react";
import { Column, TableOptions, usePagination, useTable } from "react-table";

interface EditableCellProps {
    value: any;
    row: any;
    column: any;
    updateMyData: any;
}

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData // This is a custom function that we supplied to our table instance
}: EditableCellProps) => {
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // We'll only update the external data when the input is blurred
    const onBlur = () => {
        updateMyData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    // return <input value={value} onChange={onChange} onBlur={onBlur} style={{ border: 0 }}></input>;
    return (
        <TextField
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={id === "col1"}></TextField>
    );
};
// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
    Cell: EditableCell
};

function ReactTable({
    columns,
    data
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
    const [tabledata, setTabledata] = React.useState(data);
    const [skipPageReset, setSkipPageReset] = React.useState(false);
    //
    const updateMyData = (rowIndex: any, columnId: any, value: any) => {
        // We also turn on the flag to not reset the page
        setSkipPageReset(true);
        setTabledata((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value
                    };
                }
                return row;
            })
        );
    };
    const tableInstance = useTable(
        {
            columns,
            data: tabledata,
            defaultColumn,
            // use the skipPageReset option to disable page resetting temporarily
            autoResetPage: !skipPageReset,
            // updateMyData isn't part of the API, but
            // anything we put into these options will
            // automatically be available on the instance.
            // That way we can call this function from our
            // cell renderer!
            updateMyData
        },
        usePagination
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (
        <>
            {/* // apply the table props */}
            <Table {...getTableProps()}>
                <TableHead>
                    {
                        // Loop over the header rows
                        headerGroups.map((headerGroup) => (
                            // Apply the header row props
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {
                                    // Loop over the headers in each row
                                    headerGroup.headers.map((column) => (
                                        // Apply the header cell props
                                        <TableCell {...column.getHeaderProps()}>
                                            {
                                                // Render the header
                                                column.render("Header")
                                            }
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableHead>
                {/* Apply the table body props */}
                <TableBody {...getTableBodyProps()}>
                    {
                        // Loop over the table rows
                        rows.map((row) => {
                            // Prepare the row for display
                            prepareRow(row);
                            return (
                                // Apply the row props
                                <TableRow {...row.getRowProps()}>
                                    {
                                        // Loop over the rows cells
                                        row.cells.map((cell) => {
                                            // Apply the cell props
                                            return (
                                                <TableCell {...cell.getCellProps()}>
                                                    {
                                                        // Render the cell contents
                                                        cell.render("Cell")
                                                    }
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            );
                        })
                    }
                </TableBody>
            </Table>
            <textarea value={JSON.stringify(tabledata)}></textarea>
        </>
    );
}

interface Props {
    columns: Column[];
    data: any[];
}
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const columns: Column[] = [
        {
            Header: "Column1",
            accessor: "col1"
        },
        {
            Header: "Column2",
            accessor: "col2"
        }
    ];
    const data = [
        {
            col1: "Hello",
            col2: "World"
        },
        {
            col1: "react-table",
            col2: "rocks"
        },
        {
            col1: "whatever",
            col2: "you want"
        }
    ];
    return {
        props: {
            columns,
            data
        }
    };
};

ReactTable.layout = Layout;

export default ReactTable;
