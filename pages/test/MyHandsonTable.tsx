import Layout from "@components/Layout";
import NoSSRHandsontableWrapper from "@components/NoSSRHandsontable";
import { verifyAuth } from "@lib/server/verifyAuth";
import { Button, Container, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { GetServerSideProps } from "next";
import React, { ReactElement } from "react";

const useStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            root: {
                height: "100%"
            },
            gridContainer: {
                height: "100%",
                padding: `${theme.spacing(2)}px 0px`
            },
            toolBar: {
                minHeight: "10%"
            },
            Hot: {
                minHeight: "90%"
            }
        })
    );

interface PropsType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}

const MyHandsontable = ({ data }: PropsType): ReactElement => {
    //styles
    const classes = useStyles()();
    return (
        <Container className={classes.root}>
            <Grid container className={classes.gridContainer}>
                <Grid container item xs={12} className={classes.toolBar} alignItems="center">
                    <Grid item>
                        <Button variant="outlined">Save</Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.Hot}>
                    <NoSSRHandsontableWrapper data={data}></NoSSRHandsontableWrapper>
                </Grid>
            </Grid>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps<PropsType> = async (ctx) => {
    verifyAuth(ctx);
    //create data for handsontable
    const data = [
        ["", "Tesla", "Mercedes", "Toyota", "Volvo"],
        ["2019", 10, 11, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13]
    ];

    return {
        props: {
            data: data
        }
    };
};

MyHandsontable.layout = Layout;

export default MyHandsontable;
