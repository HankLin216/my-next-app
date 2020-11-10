// import Head from "next/head";
import Login from "@components/form/login";
import { Box, Button, Container, Grid, Theme, Typography } from "@material-ui/core/";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as jsCookies from "js-cookie";
import Link from "next/link";
// import styles from "../styles/Home.module.css";
import { ReactElement, useState } from "react";

const useStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                height: "100%"
            },
            barView: {
                width: "100%",
                height: "10%",
                borderBottom: "1px solid black",
                "& #barContainer": {
                    height: "100%",
                    "& #barGridContainer": {
                        height: "100%"
                    }
                }
            },
            barTitle: {
                fontWeight: theme.typography.fontWeightBold
            },
            mainView: {
                width: "100%",
                height: "50%",
                borderBottom: "1px solid black",
                "& #mainContainer": {
                    height: "100%",
                    "& #mainGridContainer": {
                        height: "100%"
                    }
                }
            },
            footerView: {
                width: "100%",
                height: "40%"
            }
        })
    );

const Index = (): ReactElement => {
    const classes = useStyles()();
    const [login, setLogin] = useState(false);
    //method
    const getUserAccountAfterVerify = (): ReactElement => {
        //get user account
        const userAccount = jsCookies.get("UserAccount");
        return (
            <Grid container direction="column" spacing={3} justify="center" alignItems="center">
                <Grid item>
                    <Typography variant="h5">{`Hi ${userAccount}`}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">{`Click following botton to continue`}</Typography>
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <Link href="/home" passHref>
                                <Button variant="outlined" style={{ marginRight: "16px" }}>
                                    Start
                                </Button>
                            </Link>
                            <Button variant="outlined" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
    const handleLogout = (): void => {
        //get user account
        const account = jsCookies.get("UserAccount");
        jsCookies.remove("UserAccount");
        if (account !== undefined) {
            jsCookies.remove(account);
        }
        setLogin(false);
    };
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            direction="row"
            className={classes.root}>
            <Grid item xs={12} className={classes.barView}>
                <Container id={"barContainer"} fixed>
                    <Grid id={"barGridContainer"} container justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <Typography variant={"h5"} className={classes.barTitle}>
                                MS
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item xs={12} className={classes.mainView}>
                <Container id="mainContainer" fixed>
                    <Grid id="mainGridContainer" container justify="center" alignItems="center">
                        <Grid item xs={6}>
                            <Typography variant={"h4"}>Welcome to MS</Typography>
                            <br></br>
                            <Typography variant={"h5"}>here is some description</Typography>
                        </Grid>
                        <Grid item xs={6} alignItems="center">
                            {login ? (
                                getUserAccountAfterVerify()
                            ) : (
                                <Login setLogin={setLogin}></Login>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item xs={12} className={classes.footerView}></Grid>
        </Grid>
    );
};

export default Index;
