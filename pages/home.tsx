//react
//material
import { Container, Typography } from "@material-ui/core";
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

Home.layout = Layout;

export default Home;
