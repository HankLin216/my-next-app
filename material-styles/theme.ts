import { createMuiTheme } from "@material-ui/core/styles";
import { CSSProperties } from "react";
declare module "@material-ui/core/styles/createPalette" {
    // eslint-disable-next-line no-unused-vars
    interface TypeBackground {
        light: CSSProperties["color"];
    }
}
declare module "@material-ui/core/styles/createMuiTheme" {
    // interface Theme {
    // }
    // interface ThemeOptions {
    // }
}

const Theme = createMuiTheme({
    // appBar: {
    //     height: 64
    // }
    spacing: 8,
    palette: {
        // type: "dark",
        background: {
            // light: "#424242"
            // default: "#303030"
        }
    }
});

export default Theme;
