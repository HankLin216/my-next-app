import {
    Box,
    Button,
    ButtonBase,
    Checkbox,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Snackbar,
    Tab,
    Tabs,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CloseIcon from "@material-ui/icons/Close";
import { Autocomplete } from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
import { createStyles, makeStyles } from "@material-ui/styles";
import type { RootState } from "apptypes/redux";
import Layout from "components/Layout";
import { MaterialTableIcon } from "components/MaterialTableIcon";
import { readAsDataURL } from "lib/client/fileReader";
import { verifyAuth } from "lib/server/verifyAuth";
import { Column, MTableHeader } from "material-table";
import { GetResult } from "model/fetch";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import PropagateLoader from "react-spinners/PropagateLoader";
import * as Actions from "store/Management/addProduct/action";
import { BasicInfoStateInitState } from "store/Management/addProduct/reducer";

function getLoadingSpinner() {
    return (
        <Grid id={"asdasd"} container justify="center" alignItems="center" style={{ minHeight: "inherit" }}>
            <Grid item>
                <PropagateLoader></PropagateLoader>
            </Grid>
        </Grid>
    );
}

const TextEditor = dynamic(() => import("components/TextEditor"), {
    ssr: false,
    loading: getLoadingSpinner
});

const Table = dynamic(() => import("material-table"), {
    ssr: false,
    loading: getLoadingSpinner
});

function useBasicInfoStyles() {
    return makeStyles((theme: Theme) =>
        createStyles({
            root: {
                "& .MuiTextField-root": {
                    width: "65%"
                }
                // marginBottom: theme.spacing(2)
            },
            texteditorWrapper: {
                minHeight: 400
            }
        })
    );
}

// type BasicInfoState = BasicInfoStateInitState;

function BasicInfo() {
    //state
    const [categories, setCategories] = useState<string[]>([]);
    //redux
    const dispatch = useDispatch();

    // const state = useSelector<RootState, BasicInfoState>((s) => {
    //     const _productName = s.managementState.addProductState.BasicInfoState.productName ?? "";
    //     const _productID = s.managementState.addProductState.BasicInfoState.productID ?? "";
    //     const _productSeries = s.managementState.addProductState.BasicInfoState.productSeries ?? "";
    //     const _productCategory = s.managementState.addProductState.BasicInfoState.productCategory ?? "";
    //     const _productDescription = s.managementState.addProductState.BasicInfoState.productDescription ?? "";
    //     return {
    //         productName: _productName,
    //         productID: _productID,
    //         productSeries: _productSeries,
    //         productCategory: _productCategory,
    //         productDescription: _productDescription
    //     };
    // }, shallowEqual);
    //styles
    const classes = useBasicInfoStyles()();
    //method
    const handleUpdateProductName = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        dispatch(Actions.UpdateProductNameAction(value));
    };
    const handleUpdateProductSeries = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        dispatch(Actions.UpdateProductSeriesAction(value));
    };
    const handleUpdateProductID = (event: React.FocusEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        dispatch(Actions.UpdateProductIDAction(value));
    };
    const handleUpdateProductCategory = (event: any, newValue: string | null) => {
        const value = newValue ?? "";
        dispatch(Actions.UpdateProductCategoryAction(value));
    };
    const handleUpdateProductDescription = (value: string) => {
        dispatch(Actions.UpdateProductDescriptionAction(value));
    };

    return (
        <Paper id={"基本資料"} elevation={5} square className={classes.root}>
            {/* title */}
            <Box p={1}>
                <Typography variant={"h5"}>基本資料</Typography>
            </Box>
            {/* divider */}
            <Box pl={1} pr={1}>
                <Divider></Divider>
            </Box>
            {/* context */}
            <Box p={3} pl={5}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="名稱"
                            required
                            onBlur={handleUpdateProductName}
                            InputLabelProps={{
                                shrink: true
                            }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="系列"
                            onBlur={handleUpdateProductSeries}
                            InputLabelProps={{
                                shrink: true
                            }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="貨號"
                            required
                            onBlur={handleUpdateProductID}
                            InputLabelProps={{
                                shrink: true
                            }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={categories}
                            onChange={handleUpdateProductCategory}
                            renderInput={(param) => (
                                <TextField {...param} required label={"種類"} InputLabelProps={{ shrink: true }}></TextField>
                            )}></Autocomplete>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"subtitle1"}>商品描述</Typography>
                        <div className={classes.texteditorWrapper}>
                            <TextEditor handleUpdateProductDescription={handleUpdateProductDescription}></TextEditor>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}

const useFactoryStlyes = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                // marginBottom: theme.spacing(3)
            }
        })
    );

function FactoryInfo() {
    //styles
    const classes = useFactoryStlyes()();
    return (
        <Paper id="廠商資料" elevation={5} square className={classes.root}>
            <Box p={1}>
                <Typography variant={"h5"}>廠商資料</Typography>
            </Box>
            <Box pl={1} pr={1}>
                <Divider></Divider>
            </Box>
            <Box p={3} pl={5}></Box>
        </Paper>
    );
}

interface PriceTableRow {
    [k: string]: number | string;
}

const usePriceQuantityInfoStlyes = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                // marginBottom: theme.spacing(3)
            },
            tableWrapper: {
                minHeight: 400,
                "& th": {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.getContrastText(theme.palette.primary.dark)
                },
                // only for table
                "& > .MuiGrid-item:nth-child(2n)": {
                    minHeight: "inherit"
                }
            }
        })
    );

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface PriceQuantityInfoProps {
    colorList: string[];
}
interface PriceQuantityReduxState {
    PriceTableData: any[];
    QuantityTableData: any[];
}
function PriceQuantityInfo(props: PriceQuantityInfoProps): ReactElement {
    const colors = props.colorList;
    //state
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [basicPrice, setBasicPrice] = useState<number>(0);
    const [basicQuantity, setBasicQuantity] = useState<number>(0);
    //redux
    const dispatch = useDispatch();
    const state = useSelector<RootState, PriceQuantityReduxState>((s) => {
        return {
            PriceTableData: s.managementState.addProductState.PriceQuantityInfoState.PriceTableData,
            QuantityTableData: s.managementState.addProductState.PriceQuantityInfoState.QuantityTableData
        };
    });
    //life
    //style
    const classes = usePriceQuantityInfoStlyes()();
    //method
    function handleOnChangeColors(event: React.ChangeEvent<any>, newvalue: string[]) {
        setSelectedColors(newvalue);
        //dispatch
        const _pdata = getTableRowData(newvalue, selectedSizes, state.PriceTableData, basicPrice);
        const _qdata = getTableRowData(newvalue, selectedSizes, state.QuantityTableData, basicQuantity);
        dispatch(Actions.UpdatePriceTableDataAction(_pdata));
        dispatch(Actions.UpdateQuantityTableDataAction(_qdata));
    }
    function handleOnChangeSizes(event: React.ChangeEvent<any>, newvalue: string[]) {
        setSelectedSizes(newvalue);
        const _priceTable = getTableRowData(selectedColors, newvalue, state.PriceTableData, basicPrice);
        const _quantityTAble = getTableRowData(selectedColors, newvalue, state.QuantityTableData, basicQuantity);
        dispatch(Actions.UpdatePriceTableDataAction(_priceTable));
        dispatch(Actions.UpdateQuantityTableDataAction(_quantityTAble));
    }
    function handleOnChanePriceOrQuantity(event: React.ChangeEvent<HTMLInputElement>) {
        const actId = event.target.id;

        const _numStr = event.target.value;
        let num = 0;
        if (_numStr === "" || Number.isNaN(parseInt(event.target.value, 10))) {
            num = 0;
        } else {
            num = parseInt(event.target.value, 10);
        }
        switch (actId) {
            case "BasicQuantity":
                setBasicQuantity(num);
                dispatch(Actions.UpdateQuantityTableDataAction(getTableRowData(selectedColors, selectedSizes, [], num)));
                break;
            case "BasicPrice":
                setBasicPrice(num);
                dispatch(Actions.UpdatePriceTableDataAction(getTableRowData(selectedColors, selectedSizes, [], num)));
                break;
            default:
                break;
        }
    }
    function AutoCompeleteRenderTags(value: string[], getTagProps: any) {
        const _tags = value.map((v: string, index: number) => {
            return <Chip key={`tag-${v}`} variant={"outlined"} label={v} {...getTagProps({ index })}></Chip>;
        });
        const tags = _tags.slice(0, 3);
        if (value.length > 3) {
            tags.push(<span key={"MoreSizes"} style={{ marginLeft: 3 }}>{`+${value.length - 3}`}</span>);
        }

        return tags;
    }
    function getTableColumns() {
        const _columns: Column<PriceTableRow>[] = selectedSizes.map((s) => {
            return {
                title: s,
                field: s
            };
        });
        _columns.unshift({
            title: "",
            field: "none",
            editable: "never"
        });

        return _columns;
    }
    function getTableRowData(colors: string[], sizes: string[], refTableData: any[], basicValue: number): PriceTableRow[] {
        const tableRows = [];
        for (let i = 0; i < colors.length; i++) {
            const currentColor = colors[i];
            const tableRow: PriceTableRow = {
                none: currentColor
            };
            const matchRow = refTableData.filter((r) => r["none"] === currentColor)[0];

            for (let j = 0; j < sizes.length; j++) {
                const currentSize = sizes[j];
                let value = basicValue;
                if (matchRow && matchRow[currentSize]) {
                    value = matchRow[currentSize];
                }
                tableRow[currentSize] = value;
            }
            tableRows.push(tableRow);
        }
        return tableRows;
    }
    function UpdateTableRowDataByCell(newValue: number, WhichTable: string, WhichColor: string, WhichField: string) {
        let tableData: any[] = [];

        if (WhichTable === "Price") {
            tableData = state.PriceTableData;
        } else if (WhichTable === "Quantity") {
            tableData = state.QuantityTableData;
        }

        const newTableData = tableData.map((r) => {
            const _r = { ...r };
            if (_r["none"] === WhichColor) {
                _r[WhichField] = newValue;
            }
            return _r;
        });

        if (WhichTable === "Price") {
            dispatch(Actions.UpdatePriceTableDataAction(newTableData));
        } else if (WhichTable === "Quantity") {
            dispatch(Actions.UpdateQuantityTableDataAction(newTableData));
        }
    }
    return (
        <Paper id="價量資料" elevation={5} square>
            {/* title */}
            <Box p={1}>
                <Typography variant={"h5"}>價量資料</Typography>
            </Box>
            {/* divide */}
            <Box pl={1} pr={1}>
                <Divider></Divider>
            </Box>
            {/* context */}
            <Box p={3} pl={5}>
                <Grid container direction="column" spacing={3}>
                    {/* selector */}
                    <Grid container item justify={"flex-start"} direction="column">
                        <Grid item>
                            <Typography variant={"subtitle1"}>
                                選擇<span style={{ color: "red" }}>顏色</span>調整表格列數,選擇
                                <span style={{ color: "blue" }}>尺寸</span>調整表格行數
                            </Typography>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs={4}>
                                <Autocomplete
                                    value={selectedColors}
                                    options={colors}
                                    multiple
                                    getOptionLabel={(option) => option}
                                    disableCloseOnSelect
                                    renderTags={AutoCompeleteRenderTags}
                                    renderOption={(option, state) => {
                                        return (
                                            <>
                                                <Checkbox icon={icon} checkedIcon={checkedIcon} checked={state.selected}></Checkbox>
                                                {option}
                                            </>
                                        );
                                    }}
                                    renderInput={(params) => <TextField {...params} label="顏色" variant="outlined" />}
                                    onChange={handleOnChangeColors}></Autocomplete>
                            </Grid>
                            <Grid item xs={4}>
                                <Autocomplete
                                    value={selectedSizes}
                                    options={["XS", "S", "M", "X", "XL"].map((s) => s.toUpperCase())}
                                    multiple
                                    getOptionLabel={(option) => option}
                                    disableCloseOnSelect
                                    renderTags={AutoCompeleteRenderTags}
                                    renderOption={(option, state) => {
                                        return (
                                            <>
                                                <Checkbox icon={icon} checkedIcon={checkedIcon} checked={state.selected}></Checkbox>
                                                {option}
                                            </>
                                        );
                                    }}
                                    renderInput={(params) => <TextField {...params} label="尺寸" variant="outlined" />}
                                    onChange={handleOnChangeSizes}></Autocomplete>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* price table & quantity table */}
                    <Grid container item className={classes.tableWrapper} direction={"column"} spacing={2}>
                        {/* basic price input */}
                        <Grid container item alignItems={"center"} spacing={2}>
                            <Grid item>
                                <Typography variant="h5">價目表</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    value={basicPrice}
                                    onChange={handleOnChanePriceOrQuantity}
                                    size="small"
                                    label={"基本價錢"}
                                    fullWidth
                                    variant={"outlined"}
                                    InputProps={{ id: "BasicPrice" }}
                                    InputLabelProps={{ shrink: true }}></TextField>
                            </Grid>
                        </Grid>
                        {/* price table */}
                        <Grid item>
                            <Table
                                title={""}
                                icons={MaterialTableIcon}
                                columns={getTableColumns() as any}
                                data={state.PriceTableData}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: "請選擇顏色與尺寸"
                                    }
                                }}
                                options={{
                                    toolbar: false,
                                    search: false,
                                    maxBodyHeight: 450,
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, selectedColors.length]
                                }}
                                components={{
                                    Container: function getContainer(props) {
                                        return <Paper square {...props}></Paper>;
                                    }
                                }}
                                cellEditable={{
                                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                        const newNum = parseInt(newValue, 10);
                                        const oldNum = parseInt(oldValue, 10);

                                        return new Promise((resolve, reject) => {
                                            if (!Number.isNaN(newNum) && !Number.isNaN(oldNum) && newNum !== oldNum) {
                                                resolve();
                                                setTimeout(() => {
                                                    UpdateTableRowDataByCell(
                                                        newNum as number,
                                                        "Price",
                                                        (rowData as { [k: string]: string })["none"],
                                                        columnDef.field ?? ""
                                                    );
                                                }, 10);
                                            } else {
                                                reject();
                                            }
                                        });
                                    }
                                }}></Table>
                        </Grid>
                        {/* basic quantity input */}
                        <Grid container item alignItems={"center"} spacing={2}>
                            <Grid item>
                                <Typography variant="h5">庫存表</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    value={basicQuantity}
                                    onChange={handleOnChanePriceOrQuantity}
                                    size="small"
                                    label={"基本數量"}
                                    fullWidth
                                    variant={"outlined"}
                                    InputProps={{ id: "BasicQuantity" }}
                                    InputLabelProps={{ shrink: true }}></TextField>
                            </Grid>
                        </Grid>
                        {/* quantity table */}
                        <Grid item>
                            <Table
                                title={"庫存表"}
                                icons={MaterialTableIcon}
                                columns={getTableColumns() as any}
                                data={state.QuantityTableData}
                                localization={{
                                    body: {
                                        emptyDataSourceMessage: "請選擇顏色與尺寸"
                                    }
                                }}
                                options={{
                                    toolbar: false,
                                    search: false,
                                    maxBodyHeight: 450,
                                    pageSize: 5,
                                    pageSizeOptions: [5, 10, selectedColors.length]
                                }}
                                components={{
                                    Container: function getContainer(props) {
                                        return <Paper square {...props}></Paper>;
                                    }
                                }}
                                cellEditable={{
                                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                                        const newNum = parseInt(newValue, 10);
                                        const oldNum = parseInt(oldValue, 10);

                                        return new Promise((resolve, reject) => {
                                            if (!Number.isNaN(newNum) && !Number.isNaN(oldNum) && newNum !== oldNum) {
                                                resolve();
                                                setTimeout(() => {
                                                    UpdateTableRowDataByCell(
                                                        newNum as number,
                                                        "Quantity",
                                                        (rowData as { [k: string]: string })["none"],
                                                        columnDef.field ?? ""
                                                    );
                                                }, 10);
                                            } else {
                                                reject();
                                            }
                                        });
                                    }
                                }}></Table>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}
//
function useMediaInfoStyles() {
    return makeStyles((theme: Theme) =>
        createStyles({
            root: {},
            photoPaper: {
                position: "relative",
                height: 200,
                width: 150,
                "& img": {
                    height: "100%",
                    width: "100%",
                    objectFit: "contain"
                }
            },
            uploadButton: {
                height: "inherit",
                width: "inherit"
            },
            deleteIcon: {
                position: "absolute",
                right: 0
            },
            errorMessage: {
                color: "red"
            }
        })
    );
}

interface PhotoInfo {
    file: File;
    fileURL: string;
}

interface ErrorMessage {
    status: boolean;
    message: string;
}

function MediaInfo(): ReactElement {
    const [errorMessage, setErrorMessage] = useState<ErrorMessage>({ status: false, message: "" });
    const [photoList, setPhotoList] = useState<PhotoInfo[]>([]);
    //styles
    const classes = useMediaInfoStyles()();
    //method
    const handleUploadChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const _filelist = event.currentTarget.files;
        if (_filelist) {
            const fileArray = Array.from(_filelist);
            //check if there has same photo
            for (const f of fileArray) {
                for (const pi of photoList) {
                    if (f.name === pi.file.name) {
                        setErrorMessage({ status: true, message: "已經有相同名稱的照片被上傳!" });
                        return;
                    }
                }
            }
            const newPhotoList: PhotoInfo[] = [];

            //
            for (const _f of fileArray) {
                const photo: PhotoInfo = {
                    file: _f,
                    fileURL: ""
                };
                //
                const url = await readAsDataURL(_f).then((dataURL) => dataURL);
                photo.fileURL = url;
                newPhotoList.push(photo);
                //
                // URL.createObjectURL();
                //
            }
            setPhotoList(photoList.concat(newPhotoList));
        }
    };

    function handleInputOnClick(event: React.MouseEvent<HTMLInputElement>) {
        event.currentTarget.value = "";
    }

    function handleDeleteInconClick(idx: number) {
        const preList = photoList.slice(0, idx);
        const postList = photoList.slice(idx + 1);
        const newList = preList.concat(postList);

        setPhotoList(newList);
    }

    function handleSnackBarClosed() {
        setErrorMessage({ ...errorMessage, status: false });
    }
    return (
        <Paper id={"多媒體資料"} square elevation={5}>
            {/* title */}
            <Box p={1}>
                <Typography variant={"h5"}>多媒體資料</Typography>
            </Box>
            {/* divide */}
            <Box pl={1} pr={1}>
                <Divider></Divider>
            </Box>
            {/* context */}
            <Box p={3} pl={5}>
                {/* photo */}
                <Grid container spacing={2}>
                    {/* photo list */}
                    {photoList.length !== 0
                        ? photoList.map((p, idx) => {
                              return (
                                  <Grid key={p.file.name} item>
                                      {/* image */}
                                      <Paper className={classes.photoPaper} square elevation={5}>
                                          <IconButton size="small" className={classes.deleteIcon} onClick={() => handleDeleteInconClick(idx)}>
                                              <CloseIcon></CloseIcon>
                                          </IconButton>
                                          <img alt={p.file.name} src={p.fileURL}></img>
                                      </Paper>
                                  </Grid>
                              );
                          })
                        : null}
                    {/* add photo */}
                    <Grid item>
                        <Paper className={classes.photoPaper} square elevation={5}>
                            <ButtonBase component={"label"} className={classes.uploadButton}>
                                <input
                                    hidden
                                    type="file"
                                    accept={"image/*"}
                                    multiple
                                    onChange={handleUploadChange}
                                    onClick={handleInputOnClick}></input>
                                <AddIcon></AddIcon>
                            </ButtonBase>
                        </Paper>
                    </Grid>
                </Grid>
                <Snackbar open={errorMessage.status} autoHideDuration={6000} message={errorMessage.message} onClose={handleSnackBarClosed}>
                    <Alert severity={"error"} onClose={handleSnackBarClosed}>
                        {errorMessage.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Paper>
    );
}

//
const useStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                border: "1px solid red",
                flexGrow: 1
            },
            aside: {
                border: "1px solid blue"
            },
            tabWrapper: {
                position: "fixed",
                // border: "1px solid yellow",
                "& .MuiTabs-indicator": {
                    left: 0,
                    backgroundColor: theme.palette.secondary.main,
                    //close the transition
                    transition: "all 0s"
                },
                "& .Mui-selected": {
                    color: theme.palette.secondary.main,
                    fontWeight: theme.typography.fontWeightBold
                }
            },
            main: {
                padding: theme.spacing(2),
                border: "1px solid green",
                "& .MuiPaper-root": {
                    marginBottom: theme.spacing(2)
                }
            }
        })
    );

function getNavigationList() {
    return ["基本資料", "廠商資料", "價量資料", "多媒體資料"];
}

const AddProduct = (props: Props): ReactElement => {
    const headerHeight = 50;
    //state
    const [tabValue, setTabValue] = useState<number>(0);
    //life
    useEffect(() => {
        //紀錄各元素相對頂端的位置
        const _childrenOffsetMap = new Map<string, number>();
        for (const id of getNavigationList()) {
            const yOffsets = document.getElementById(id)?.getBoundingClientRect().top;
            _childrenOffsetMap.set(id, yOffsets || 0);
        }
        //校正
        const firstEleOffsets = _childrenOffsetMap.get("基本資料");
        if (firstEleOffsets !== undefined && firstEleOffsets !== 0) {
            const offset2Init = 0 - firstEleOffsets;
            _childrenOffsetMap.forEach((value, key) => {
                _childrenOffsetMap.set(key, value + offset2Init + headerHeight);
            });
        }
        childrenOffsetsRef.current = _childrenOffsetMap;
        //
        // _childrenOffsetMap.forEach((key, value) => {
        //     console.log(`${key}: ${value}`);
        // });
    }, []);
    useEffect(() => {
        if (window) {
            //
            window.addEventListener("scroll", handleOnScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleOnScroll);
        };
    }, [tabValue]);
    //ref
    const childrenOffsetsRef = useRef<Map<string, number>>(null);
    //style
    const classes = useStyles()();
    //method
    const handleScroll2TargetAdjusted = (id: string) => {
        if (id) {
            const anchorEl = document.getElementById(id);
            if (anchorEl) {
                // get the current the page offsets
                const currentPageYOffsets = window.pageYOffset;
                // anchorEl.scrollIntoView({ block: "start", behavior: "smooth" });
                const elPosition = anchorEl.getBoundingClientRect().top;
                const offset = currentPageYOffsets + elPosition - headerHeight;
                window.scrollTo({
                    top: offset,
                    behavior: "auto"
                });
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/ban-types
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        const label = (event.currentTarget as HTMLDivElement).id;
        handleScroll2TargetAdjusted(label);
        setTabValue(newValue);
    };

    function handleOnScroll() {
        //current page offsets
        const currentPageYOffsets = window.pageYOffset;
        //compare the offsets of each component
        let closedId = "";
        let tmp = -1;
        childrenOffsetsRef.current?.forEach((value, key) => {
            const diff = Math.abs(currentPageYOffsets - value);
            if (tmp === -1 || diff < tmp) {
                tmp = diff;
                closedId = key;
            }
            // console.log(`${key} : ${value} ==> diff is ${diff}`);
        });

        const childId_In_TabIndx = getNavigationList().indexOf(closedId);
        if (childId_In_TabIndx !== -1) {
            setTabValue(childId_In_TabIndx);
        }
    }
    return (
        <Grid container className={classes.root}>
            <Grid item container xs={10} className={classes.main} direction={"column"}>
                {/* 基本資料 */}
                <Grid item>
                    <BasicInfo></BasicInfo>
                </Grid>
                {/* 廠商資料 */}
                <Grid item>
                    <FactoryInfo></FactoryInfo>
                </Grid>
                {/* 價量資料 */}
                <Grid item>
                    <PriceQuantityInfo colorList={props.colorList}></PriceQuantityInfo>
                </Grid>
                {/* 多媒體資料 */}
                <Grid item>
                    <MediaInfo></MediaInfo>
                </Grid>
            </Grid>
            <Grid container item xs={2} className={classes.aside} direction="column">
                <div className={classes.tabWrapper}>
                    <Tabs orientation="vertical" value={tabValue} onChange={handleTabChange}>
                        {getNavigationList().map((t) => {
                            return <Tab id={t} key={t} label={t} disableRipple></Tab>;
                        })}
                    </Tabs>
                </div>
            </Grid>
        </Grid>
    );
};
interface Props {
    colorList: string[];
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    verifyAuth(ctx);
    //get color name
    const res: GetResult = await fetch("http://localhost:3000/api/Color").then((r) => r.json());
    if (!res.status) {
        //redirect to 500
        ctx.res.writeHead(302, {
            Location: "/500"
        });
    }

    return {
        props: {
            colorList: res.data.map((r) => r.color)
            // data: null
        }
    };
};

AddProduct.layout = Layout;
export default AddProduct;
