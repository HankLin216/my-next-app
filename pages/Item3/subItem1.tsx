//react
//material-ui
import { Button, Container, Divider, Typography } from "@material-ui/core";
import { ReactElement } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";

//Layout
import Layout from "../../components/Layout";
import type { RootState } from "../../store/index";
//action
import {
    AddCountAction as subItem1AddCountAction,
    SubstractCountAction as subItem1SubstractCountAction
} from "../../store/item3/subItem1/action";
import {
    AddCountAction as subItem2AddCountAction,
    SubstractCountAction as subItem2SubstractCountAction
} from "../../store/item3/subItem2/action";

const SubItem1 = (): ReactElement => {
    const { subitem1Count, subitem2Count } = useSelector<
        RootState,
        { subitem1Count: number; subitem2Count: number }
    >((state) => {
        return {
            subitem1Count: state.item3State.subItem1State.count,
            subitem2Count: state.item3State.subItem2State.count
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
        </Container>
    );
};

SubItem1.layout = Layout;

export default SubItem1;
