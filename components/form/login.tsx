import { AuthResult, LoginPostData } from "@apptypes/auth";
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
import React, { Dispatch, ReactElement, SetStateAction, useRef, useState } from "react";

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
                width: "100%",
                "& button": {
                    width: "100%"
                }
            },
            progressWrap: {
                width: "100%",
                position: "relative"
            },
            progress: {
                width: "100%",
                position: "absolute"
            }
        })
    );
interface LoginPropsType {
    setLogin: Dispatch<SetStateAction<boolean>>;
    className: string;
}

const Login = (props: LoginPropsType): ReactElement => {
    const [isFetch, setIsFetch] = useState<boolean>(false);
    const [textFieldError, setTextFieldError] = useState<{
        account: string;
        password: string;
    }>({ account: "", password: "" });
    const accountRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const classes = useStyles()();

    //method
    const handleLoginClick = async () => {
        //get the value
        const account = accountRef.current?.value;
        const password = passwordRef.current?.value;
        if (!account) {
            setTextFieldError({ ...textFieldError, account: "請重新輸入帳號", password: "" });
            return;
        }
        if (!password) {
            setTextFieldError({ ...textFieldError, account: "", password: "請重新輸入密碼" });
            return;
        }
        //auth
        setIsFetch(true);
        const result = await Post<LoginPostData, AuthResult>("/api/auth", {
            account,
            password
        });
        setIsFetch(false);
        //check
        switch (result.error) {
            case "查無此帳號":
                setTextFieldError({ ...textFieldError, account: result.error, password: "" });
                return;
            case "密碼錯誤":
                setTextFieldError({ ...textFieldError, account: "", password: result.error });
                return;
        }
        //set cookie
        Cookies.set("Account", account);
        Cookies.set(account, result.token);
        //inform index page user has login success
        props.setLogin(true);
        return;
    };

    const handleKeyBoardPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
        if (event.key === "Enter") {
            handleLoginClick();
        }
    };
    return (
        <Paper
            square
            elevation={5}
            className={`${classes.root} ${props.className}`}
            onKeyPress={handleKeyBoardPress}>
            <Typography variant="h5" className={classes.formTitle}>
                Login
            </Typography>
            <Divider></Divider>
            {isFetch ? (
                <div className={classes.progressWrap}>
                    <LinearProgress className={classes.progress}></LinearProgress>
                </div>
            ) : null}
            <Box p={2}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.formBody}
                    spacing={3}>
                    <Grid item>
                        <TextField
                            label="Account"
                            error={textFieldError.account ? true : false}
                            helperText={textFieldError.account || " "}
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
                            label="Password"
                            type="password"
                            error={textFieldError.password ? true : false}
                            helperText={textFieldError.password || " "}
                            inputRef={passwordRef}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock></Lock>
                                    </InputAdornment>
                                )
                            }}></TextField>
                    </Grid>
                    <Grid item className={classes.formAction}>
                        <Button variant="outlined" color="primary" onClick={handleLoginClick}>
                            Comfirm
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default Login;
