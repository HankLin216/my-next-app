import { LoginPostData, VaildResult } from "@apptypes/auth";
import { Post } from "@lib/client/fetcher";
import {
    Box,
    Button,
    Divider,
    Grid,
    InputAdornment,
    LinearProgress,
    Paper,
    TextField,
    Theme,
    Typography
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { AccountCircle, Lock } from "@material-ui/icons";
import Cookies from "js-cookie";
import React, { ReactElement, useRef, useState } from "react";

const useStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                margin: theme.spacing(3),
                maxWidth: 300
            },
            formTitle: {
                padding: theme.spacing(2),
                fontWeight: theme.typography.fontWeightBold
            },
            formBody: {
                padding: theme.spacing(3)
            },
            formAction: {
                // "& button":{
                //     width:
                // }
            }
        })
    );
const login = (): ReactElement => {
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const accountRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const classes = useStyles()();

    //method
    const handleLoginClick = async () => {
        //get the value
        const account = accountRef.current?.value;
        const password = passwordRef.current?.value;
        if (!account || !password) {
            return;
        }
        //auth
        setIsFetch(true);
        const result = await Post<LoginPostData, VaildResult>("/api/auth", {
            account,
            password
        });
        //set cookie
        Cookies.set(account, result.token);
        setIsFetch(false);
    };
    return (
        <Paper square elevation={5} className={classes.root}>
            <Typography variant="h5" className={classes.formTitle}>
                Login
            </Typography>
            <Divider></Divider>
            {isFetch ? <LinearProgress></LinearProgress> : null}
            <Box m={2}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.formBody}
                    spacing={2}>
                    <Grid item>
                        <TextField
                            label="Account"
                            inputRef={accountRef}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle></AccountCircle>
                                    </InputAdornment>
                                )
                            }}></TextField>
                    </Grid>
                    <Grid item>
                        <TextField
                            label="password"
                            inputRef={passwordRef}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock></Lock>
                                    </InputAdornment>
                                )
                            }}></TextField>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" onClick={handleLoginClick}>
                            Comfirm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default login;
