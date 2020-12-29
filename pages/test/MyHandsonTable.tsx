import Layout from "@components/Layout";
import NoSSRHandsontable from "@components/NoSSRHandsontable";
import { verifyAuth } from "@lib/server/verifyAuth";
import { Button, Container, createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import { wrapper } from "@store/index";
import { ServerInitDataAction } from "@store/test/MyHandsontable/action";
import { GetServerSideProps } from "next";
import React, { ReactElement, useRef } from "react";
//

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
    const hotRef = useRef(null);

    React.useEffect(() => {
        return () => {
            // console.log(hotRef.current.hotInstance.getData());
        };
    });
    //styles
    const classes = useStyles()();
    return (
        <Container className={classes.root}>
            <Grid container className={classes.gridContainer}>
                <Grid container item xs={12} className={classes.toolBar} alignItems="center">
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => {
                                // console.log(hotRef.current.hotInstance.getData());
                            }}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.Hot}>
                    <NoSSRHandsontable data={data} ref={hotRef}></NoSSRHandsontable>
                </Grid>
            </Grid>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    verifyAuth(ctx);
    //create data for handsontable
    const data = [
        ["", "Tesla", "Mercedes", "Toyota", "Volvo"],
        ["2019", 10, 11, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13]
    ];
    //dispatch data
    ctx.store.dispatch(ServerInitDataAction(data));
    //
    return {
        props: {
            data: data
        }
    };
});

MyHandsontable.layout = Layout;

export default MyHandsontable;
