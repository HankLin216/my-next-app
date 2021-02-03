import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    Grid,
    Paper,
    Tab,
    Tabs,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import { Autocomplete } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/styles";
import type { RootState } from "apptypes/redux";
import Layout from "components/Layout";
import { verifyAuth } from "lib/server/verifyAuth";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import React, { ReactElement, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as Actions from "store/Management/addProduct/action";
const TextEditor = dynamic(() => import("components/TextEditor"), {
    ssr: false,
    loading: function loading() {
        return <p>loading...</p>;
    }
});

function useBasicInfoStyles() {
    return makeStyles((theme: Theme) =>
        createStyles({
            root: {
                "& .MuiTextField-root": {
                    width: "65%"
                }
                // marginBottom: theme.spacing(2)
            }
        })
    );
}

interface BasicInfoState {
    productDescription: string | null;
}
function BasicInfo() {
    //state
    const [categories, setCategories] = useState<string[]>([]);
    //redux
    // const state = useSelector<RootState, BasicInfoState>((s) => {
    //     const _productDescription = s.managementState.addProductState.productDescription;
    //     return {
    //         productDescription: _productDescription
    //     };
    // }, shallowEqual);
    const dispatch = useDispatch();
    //styles
    const classes = useBasicInfoStyles()();
    //method
    const handleUpdateProductDescription = (value: string) => {
        dispatch(Actions.UpdateProductDescriptionAction(value));
    };
    console.log("render");
    return (
        <Paper id={"基本資料"} elevation={5} square className={classes.root}>
            <Box p={1}>
                <Typography variant={"h5"}>基本資料</Typography>
            </Box>
            <Box pl={1} pr={1}>
                <Divider></Divider>
            </Box>
            <Box p={3} pl={5}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="名稱"
                            required
                            InputLabelProps={{
                                shrink: true
                            }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="系列"
                            InputLabelProps={{
                                shrink: true
                            }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="貨號"
                            required
                            InputLabelProps={{
                                shrink: true
                            }}></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={categories}
                            renderInput={(param) => (
                                <TextField
                                    {...param}
                                    required
                                    label={"種類"}
                                    InputLabelProps={{ shrink: true }}></TextField>
                            )}></Autocomplete>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant={"subtitle1"}>商品描述</Typography>
                        <TextEditor
                            handleUpdateProductDescription={
                                handleUpdateProductDescription
                            }></TextEditor>
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function PriceQuantityInfo(): ReactElement {
    //state
    const [colors, setColors] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    //life
    useEffect(() => {
        async function getColorsName() {
            const colorsArray: { color: string }[] = await fetch("/api/Color").then((r) =>
                r.json()
            );
            setColors(colorsArray.map((c) => c.color));
        }
        getColorsName();
    }, [setColors]);
    //method
    function handleOnChangeColors(event: React.ChangeEvent<any>, newvalue: string[]) {
        setSelectedColors(newvalue);
    }
    function handleOnChangeSizes(event: React.ChangeEvent<any>, newvalue: string[]) {
        setSelectedSizes(newvalue);
    }
    function AutoCompeleteRenderTags(value: string[], getTagProps: any) {
        const tags = value.slice(0, 3).map((v: string, index: number) => {
            return (
                <Chip
                    key={`tag-${v}`}
                    variant={"outlined"}
                    label={v}
                    {...getTagProps({ index })}></Chip>
            );
        });
        if (value.length > 3) {
            tags.push(<span style={{ marginLeft: 3 }}>{`+${value.length - 3}`}</span>);
        }

        return tags;
    }
    return (
        <Paper id="價量資料" elevation={5} square>
            <Box p={1}>
                <Typography variant={"h5"}>價量資料</Typography>
            </Box>
            <Box pl={1} pr={1}>
                <Divider></Divider>
            </Box>
            <Box p={3} pl={5}>
                <Grid container direction="column">
                    {/* selector */}
                    <Grid container item justify={"flex-start"} direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant={"subtitle1"}>
                                選擇<span style={{ color: "red" }}>顏色</span>調整表格列數,選擇
                                <span style={{ color: "blue" }}>尺寸</span>調整表格行數
                            </Typography>
                        </Grid>
                        <Grid container item spacing={2}>
                            <Grid item xs={5}>
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
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    checked={state.selected}></Checkbox>
                                                {option}
                                            </>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="顏色" variant="outlined" />
                                    )}
                                    onChange={handleOnChangeColors}></Autocomplete>
                            </Grid>
                            <Grid item xs={5}>
                                <Autocomplete
                                    value={selectedSizes}
                                    options={["XS", "S", "M", "X", "XL"].map((s) =>
                                        s.toUpperCase()
                                    )}
                                    multiple
                                    getOptionLabel={(option) => option}
                                    disableCloseOnSelect
                                    renderTags={AutoCompeleteRenderTags}
                                    renderOption={(option, state) => {
                                        return (
                                            <>
                                                <Checkbox
                                                    icon={icon}
                                                    checkedIcon={checkedIcon}
                                                    checked={state.selected}></Checkbox>
                                                {option}
                                            </>
                                        );
                                    }}
                                    renderInput={(params) => (
                                        <TextField {...params} label="尺寸" variant="outlined" />
                                    )}
                                    onChange={handleOnChangeSizes}></Autocomplete>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* table */}
                    <Grid item></Grid>
                </Grid>
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
                    backgroundColor: theme.palette.secondary.main
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
    return ["基本資料", "廠商資料", "價量資料"];
}

const AddProduct = (): ReactElement => {
    //state
    const [tabValue, setTabValue] = useState<number>(0);
    //style
    const classes = useStyles()();
    //method
    const handleScroll2TargetAdjusted = (id: string) => {
        if (id) {
            const anchorEl = document.getElementById(id);
            if (anchorEl) {
                // anchorEl.scrollIntoView({ block: "start", behavior: "smooth" });
                const headerHeight = 50;
                const elPosition = anchorEl.getBoundingClientRect().top;
                const offset = elPosition - headerHeight;
                window.scrollTo({
                    top: offset,
                    behavior: "smooth"
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
    return (
        <Grid container className={classes.root}>
            <Grid item container xs={10} className={classes.main} direction={"column"}>
                <Grid item>
                    {/* 基本資料 */}
                    <BasicInfo></BasicInfo>
                </Grid>
                <Grid item>
                    {/* 廠商資料 */}
                    <FactoryInfo></FactoryInfo>
                </Grid>
                <Grid item>
                    {/* 價量資料 */}
                    <PriceQuantityInfo></PriceQuantityInfo>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    verifyAuth(ctx);
    return {
        props: {
            // data: null
        }
    };
};

AddProduct.layout = Layout;
export default AddProduct;
