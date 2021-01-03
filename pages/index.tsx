// import Head from "next/head";
import Login from "@components/form/login";
import { clearTheCookies } from "@lib/client/cookies";
import { verifyAuth } from "@lib/server/verifyAuth";
import { Button, Container, Grid, Theme, Typography } from "@material-ui/core/";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import * as jsCookies from "js-cookie";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
// import styles from "../styles/Home.module.css";
import { ReactElement, useEffect, useState } from "react";
const useStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                minHeight: "100%",
                // backgroundColor: theme.palette.background.default,
                // color: "#fff"
            },
            barView: {
                width: "100%",
                height: "5vh"
            },
            barTitle: {
                fontWeight: theme.typography.fontWeightBold,
                padding: `0px ${theme.spacing(2)}px`
            },
            mainView: {
                height: "55vh",
                minHeight: "420px",
                color: "#fff",
                textAlign: "center",
                "& #mainContainer": {
                    height: "100%",
                    minHeight: "inherit",
                    "& #mainGridContainer": {
                        height: "100%",
                        minHeight: "inherit"
                        // color: "#fff"
                    }
                },
                backgroundImage: "url(/index.jpg)",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top"
            },
            footerView: {
                width: "100%",
                minHeight: "40vh"
            },
            loginform: {
                backgroundColor: "rgba(255,255,255,0.6)"
            },
            actionButton: {
                width: 100,
                backgroundColor: "rgba(0,0,0,0.4)"
            }
        })
    );

interface PropsType {
    hasLogin: boolean;
}

const Index = ({
    hasLogin
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
    const classes = useStyles()();
    const [login, setLogin] = useState(false);
    //lifecycle
    useEffect(() => {
        if (hasLogin) {
            setLogin(true);
        }
    }, []);
    //method
    const getUserProfile = (): ReactElement => {
        //get user account
        const userAccount = jsCookies.get("Account");
        return (
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={12}>
                    <Typography variant="h5">{`Hi ${userAccount}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">{`Click following botton to continue`}</Typography>
                </Grid>
                <Grid item xs={12} container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                        <Link href="/home" passHref>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.actionButton}>
                                Start
                            </Button>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleLogout}
                            className={classes.actionButton}>
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
    const handleLogout = (): void => {
        clearTheCookies();
        setLogin(false);
    };
    return (
        <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.root}
            alignContent={"flex-start"}>
            <Grid
                item
                container
                xs={12}
                className={classes.barView}
                justify="flex-start"
                alignItems="center">
                <Grid item>
                    <Typography variant={"h5"} className={classes.barTitle}>
                        MS
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} className={classes.mainView}>
                <Container id="mainContainer">
                    <Grid id="mainGridContainer" container justify="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant={"h4"}>Welcome to MS</Typography>
                            <br></br>
                            <Typography variant={"h5"}>here is some description</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {login ? (
                                getUserProfile()
                            ) : (
                                <Grid container justify="center" alignItems="center">
                                    <Grid item>
                                        <Login
                                            setLogin={setLogin}
                                            className={classes.loginform}></Login>
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item xs={12} className={classes.footerView}></Grid>
        </Grid>
    );
};

export const getServerSideProps: GetServerSideProps<PropsType> = async (context) => {
    let hasLogin = false;
    const verifyResponse = verifyAuth(context);
    if (verifyResponse !== undefined) {
        hasLogin = true;
    }
    return {
        props: {
            hasLogin
        }
    };
};

export default Index;
