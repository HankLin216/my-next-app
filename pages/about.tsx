import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ReactElement, useEffect } from "react";

//Layout
import Layout from "../components/Layout";
//redux
import { wrapper } from "../store/index";

const About = (props: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement => {
    useEffect(() => {
        const a = 1;
        const _props = props;
        console.log("hello");
    }, []);
    return <div>About</div>;
};

interface Props {
    name: string;
}

export const getServerSideProps: GetServerSideProps<Promise<{
    props: Props;
}>> = wrapper.getServerSideProps(async ({ store, preview }) => {
    const ss = store.getState();
    store.dispatch({ type: "Hello" });

    return {
        props: {
            name: "123"
        }
    };
});

About.layout = Layout;

export default About;
