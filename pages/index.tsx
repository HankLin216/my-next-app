// import Head from "next/head";
import Login from "@components/form/login";
import { Container, Typography } from "@material-ui/core/";
import Cookie from "cookie";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import styles from "../styles/Home.module.css";
import { ReactElement } from "react";

const Index = (props: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
    return <Container>{props.isLogin ? "Hello" : <Login></Login>}</Container>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!ctx.req.headers.cookie) {
        return {
            props: { isLogin: false }
        };
    }
    const cookies = Cookie.parse(ctx.req.headers.cookie);
    const aaa = cookies["G21905"];
    //verification
    const res = await fetch("http://localhost:3000/api/valid", {
        method: "POST",
        body: JSON.stringify(cookies["G21905"])
    }).then((res) => res.json());
    return {
        props: { isLogin: true }
    };
};

export default Index;
