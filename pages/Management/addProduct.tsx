import { Box, Button, Divider, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/styles";
import type { RootState } from "apptypes/redux";
import Layout from "components/Layout";
import { verifyAuth } from "lib/server/verifyAuth";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";
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
                },
                marginBottom: theme.spacing(2)
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
        <Paper id={"basicInfo"} elevation={5} square className={classes.root}>
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
                marginBottom: theme.spacing(2)
            }
        })
    );

function FactoryInfo() {
    //styles
    const classes = useFactoryStlyes()();
    return (
        <Paper id="factoryInfo" elevation={5} square className={classes.root}>
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
            main: {
                padding: theme.spacing(2),
                border: "1px solid green"
            }
        })
    );

const AddProduct = (): ReactElement => {
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
    return (
        <Grid container className={classes.root}>
            <Grid item container xs={9} className={classes.main} direction="column">
                {/* 基本資料 */}
                <BasicInfo></BasicInfo>
                {/* 廠商資料 */}
                <FactoryInfo></FactoryInfo>
            </Grid>
            <Grid container item xs={3} className={classes.aside} direction="column">
                <div style={{ border: "2px solid yellow", position: "fixed" }}>
                    <Button onClick={() => handleScroll2TargetAdjusted("basicInfo")}>
                        基本資料
                    </Button>
                    <Button onClick={() => handleScroll2TargetAdjusted("factoryInfo")}>
                        廠商資料
                    </Button>
                </div>
            </Grid>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    // verifyAuth(ctx);
    return {
        props: {
            // data: null
        }
    };
};

AddProduct.layout = Layout;
export default AddProduct;
