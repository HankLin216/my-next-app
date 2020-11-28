import { css } from "@emotion/core";
import dynamic from "next/dynamic";
import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

const override = css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: inherit;
`;
const getloader = () => {
    const loader = () => <PropagateLoader css={override} />;
    return loader;
};

interface PropsType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}
const NoSSRHandsontable = dynamic(() => import("./Handsontable"), {
    ssr: false,
    loading: getloader()
});

// eslint-disable-next-line react/display-name
const NoSSRHandsontableWrapper = React.forwardRef((props: PropsType, ref) => (
    <NoSSRHandsontable {...props} forwardedRef={ref} />
));

export default NoSSRHandsontableWrapper;
