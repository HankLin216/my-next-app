import type { RootState } from "@apptypes/redux";
import Layout from "@components/Layout";
import { Button, Container, Divider, Typography } from "@material-ui/core";
import {
    AddCountAction as subItem1AddCountAction,
    SubstractCountAction as subItem1SubstractCountAction
} from "@store/item3/subItem1/action";
import {
    AddCountAction as subItem2AddCountAction,
    fecthSomething,
    SubstractCountAction as subItem2SubstractCountAction
} from "@store/item3/subItem2/action";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubItem2 = (): ReactElement => {
    const { subitem1Count, subitem2Count, ...rest } = useSelector<
        RootState,
        { subitem1Count: number; subitem2Count: number; subitem2fetchdata: any }
    >((state) => {
        return {
            subitem1Count: state.item3State.subItem1State.count,
            subitem2Count: state.item3State.subItem2State.count,
            subitem2fetchdata: state.item3State.subItem2State.fetchData
        };
    });
    const dispatch = useDispatch();
    return (
        <Container>
            <Typography>SubItem1 count:</Typography>
            <Typography>{subitem1Count}</Typography>
            <Button onClick={() => dispatch(subItem1AddCountAction())}>ADD</Button>
            <Button onClick={() => dispatch(subItem1SubstractCountAction())}>SUBSTRACT</Button>
            <Divider></Divider>
            <Typography>SubItem2 count:</Typography>
            <Typography>{subitem2Count}</Typography>
            <Button onClick={() => dispatch(subItem2AddCountAction())}>ADD</Button>
            <Button onClick={() => dispatch(subItem2SubstractCountAction())}>SUBSTRACT</Button>
            <Divider></Divider>
            <Typography>Thunk Action:</Typography>
            <Button onClick={() => dispatch(fecthSomething())}>Dispatch</Button>
            <Typography>Thunk Action Result(fetch data):</Typography>
            <Typography>{JSON.stringify(rest.subitem2fetchdata)}</Typography>
        </Container>
    );
};

SubItem2.layout = Layout;

export default SubItem2;
