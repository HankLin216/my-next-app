// import Head from "next/head";
import { Container, Typography } from "@material-ui/core/";
// import styles from "../styles/Home.module.css";
import Link from "next/link";
import { ReactElement } from "react";

//layout
import Layout from "../components/Layout";

const Home = (): ReactElement => {
    return (
        <Container>
            <ul>
                <li>
                    <Link href={"/about"}>
                        <a>About</a>
                    </Link>
                </li>
            </ul>
            <Typography>Home</Typography>
        </Container>
    );
};

//use layout
Home.layout = Layout;

export default Home;
