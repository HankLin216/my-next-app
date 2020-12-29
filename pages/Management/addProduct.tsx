import { Box, Divider, Grid, Paper, TextField, Theme, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { createStyles, makeStyles } from "@material-ui/styles";
import Layout from "components/Layout";
import { verifyAuth } from "lib/server/verifyAuth";
import { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";

const useStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                border: "1px solid red",
                height: "100%"
            },
            aside: {
                border: "1px solid blue",
                height: "100%"
            },
            main: {
                paddingTop: theme.spacing(2),
                border: "1px solid green",
                height: "100%"
            },
            basicInfo: {
                "& .MuiTextField-root": {
                    width: 500
                }
            },
            dividerWrapper: {
                display: "flex",
                justifyContent: "center",
                "& hr": {
                    width: "98%"
                }
            }
        })
    );

const AddProduct = (): ReactElement => {
    //state
    const [categories, setCategories] = useState<string[]>([]);
    //style
    const classes = useStyles()();
    return (
        <Grid container className={classes.root}>
            <Grid item container xs={10} className={classes.main} justify="center">
                <Grid item xs={8}>
                    {/* 基本資料 */}
                    <Paper elevation={5} square className={classes.basicInfo}>
                        <Box p={2}>
                            <Typography variant={"h5"}>基本資料</Typography>
                        </Box>
                        <div className={classes.dividerWrapper}>
                            <Divider></Divider>
                        </div>
                        <Box p={3} pl={5}>
                            <Grid container xs={12} spacing={2}>
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
                                                label={"種類"}
                                                InputLabelProps={{ shrink: true }}></TextField>
                                        )}></Autocomplete>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            <Grid item xs={2} className={classes.aside}>
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
