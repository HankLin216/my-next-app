import { Box, Divider, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/styles";
import Layout from "components/Layout";
import { verifyAuth } from "lib/server/verifyAuth";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { ReactElement, useState } from "react";

const TextEditor = dynamic(() => import("components/TextEditor"), {
    ssr: false
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

function BasicInfo() {
    //state
    const [categories, setCategories] = useState<string[]>([]);
    //styles
    const classes = useBasicInfoStyles()();
    return (
        <Paper elevation={5} square className={classes.root}>
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
                        <TextEditor></TextEditor>
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
                marginBottom: theme.spacing(3)
            }
        })
    );

function FactoryInfo() {
    //styles
    const classes = useFactoryStlyes()();
    return (
        <Paper elevation={5} square className={classes.root}>
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
                paddingTop: theme.spacing(2),
                border: "1px solid green"
            }
        })
    );

const AddProduct = (): ReactElement => {
    //style
    const classes = useStyles()();
    return (
        <Grid container className={classes.root}>
            <Grid item container xs={9} className={classes.main} justify="center">
                <Grid item xs={11}>
                    {/* 基本資料 */}
                    <BasicInfo></BasicInfo>
                    {/* 廠商資料 */}
                    <FactoryInfo></FactoryInfo>
                </Grid>
            </Grid>
            <Grid item xs={3} className={classes.aside}>
                Aside
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
