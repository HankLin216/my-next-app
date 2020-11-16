// import Head from "next/head";
import Login from "@components/form/login";
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
                height: "100%"
            },
            barView: {
                width: "100%",
                minHeight: "10vh",
                borderBottom: "1px solid black",
                "& #barContainer": {
                    minHeight: "inherit",
                    "& #barGridContainer": {
                        minHeight: "inherit"
                    }
                }
            },
            barTitle: {
                fontWeight: theme.typography.fontWeightBold
            },
            mainView: {
                minHeight: "50vh",
                borderBottom: "1px solid black",
                textAlign: "center",
                "& #mainContainer": {
                    minHeight: "inherit",
                    "& #mainGridContainer": {
                        minHeight: "inherit"
                    }
                }
            },
            footerView: {
                width: "100%",
                minHeight: "40%"
            }
        })
    );

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
    const getUserAccountAfterVerify = (): ReactElement => {
        //get user account
        const userAccount = jsCookies.get("Account");
        return (
            <Grid container direction="column" spacing={3} justify="center" alignItems="center">
                <Grid item>
                    <Typography variant="h5">{`Hi ${userAccount}`}</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle1">{`Click following botton to continue`}</Typography>
                </Grid>
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
        );
    };
    const handleLogout = (): void => {
        //get user account
        const account = jsCookies.get("Account");
        jsCookies.remove("Account");
        if (account !== undefined) {
            jsCookies.remove(account);
        }
        setLogin(false);
    };
    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <Grid item xs={12} className={classes.barView}>
                <Container id={"barContainer"}>
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
                <Container id="mainContainer">
                    <Grid id="mainGridContainer" container justify="center" alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <Typography variant={"h4"}>Welcome to MS</Typography>
                            <br></br>
                            <Typography variant={"h5"}>here is some description</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {login ? (
                                getUserAccountAfterVerify()
                            ) : (
                                <Grid container justify="center" alignItems="center">
                                    <Grid item>
                                        <Login setLogin={setLogin}></Login>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
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
