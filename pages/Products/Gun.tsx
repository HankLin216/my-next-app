import Layout from "@components/Layout";
import { verifyAuth } from "@lib/server/verifyAuth";
import { GetServerSideProps } from "next";

const Gun = () => {
    return <div>Enter</div>;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    //verify
    verifyAuth(ctx);
    //get data from db
    const datalist = await fetch("http://localhost:3000/api/Products/Gun/12").then((res) =>
        res.json()
    );
    return {
        props: {
            data: null
        }
    };
};

Gun.layout = Layout;

export default Gun;
