// import Head from "next/head";
import Login from "@components/form/login";
import { Button, Container, Grid, Theme, Typography } from "@material-ui/core/";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Cookies from "cookie";
import * as jsCookies from "js-cookie";
import jwt from "jsonwebtoken";
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
                                YIYI0831
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
            <Grid item xs={12} className={classes.mainView}>
                <Container id="mainContainer" fixed>
                    <Grid id="mainGridContainer" container justify="center" alignItems="center">
                        <Grid item xs={6}>
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <Typography variant={"h4"}>Welcome to YIYI0831</Typography>
                                    <br></br>
                                    <Typography variant={"h5"}>here is some description</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
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
    //get the cookies
    const RawCookies = context.req.headers.cookie;
    if (RawCookies !== undefined) {
        const cookies = Cookies.parse(RawCookies);
        //get the user Account
        const userAccount = cookies["UserAccount"];
        //get the token
        const token = cookies[userAccount];
        //check env variable
        if (process.env.JWT_SECRET === undefined) {
            throw new Error("伺服器遺失密鑰!");
        }
        if (process.env.JWT_ALGORITHM === undefined) {
            throw new Error("伺服器找不到解密演算法!");
        }
        //verify token
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
            algorithms: [process.env.JWT_ALGORITHM] as jwt.Algorithm[]
        });
        //compare with account
        if ((payload as { [key: string]: string })["UserAccount"] === userAccount) {
            hasLogin = true;
        }
    }
    return {
        props: {
            hasLogin
        }
    };
};

export default Index;
