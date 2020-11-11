import { verifyAuth } from "@lib/verifyAuth";
import { Container, Typography } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

//Layout
import Layout from "../components/Layout";

const Home = (): ReactElement => {
    return (
        <Container>
            <Typography>Home</Typography>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    verifyAuth(context);
    return {
        props: {}
    };
};

Home.layout = Layout;

export default Home;
