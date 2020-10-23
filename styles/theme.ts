import { createMuiTheme } from "@material-ui/core/styles";
// import { CSSProperties } from "react";

declare module "@material-ui/core/styles/createMuiTheme" {
    // interface Theme {
    //     appBar: {
    //         height: CSSProperties["height"];
    //     };
    // }
    // interface ThemeOptions {
    //     appBar?: {
    //         height: CSSProperties["height"];
    //     };
    // }
}

const Theme = createMuiTheme({
    // appBar: {
    //     height: 64
    // }
    spacing: 8
});

export default Theme;
