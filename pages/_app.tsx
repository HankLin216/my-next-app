//styles
import "../styles/globals.css";

//theme
import { ThemeProvider } from "@material-ui/core/styles";
import type { AppProps /*, AppContext */ } from "next/app";
import { ReactElement } from "react";

//custom components
import Layout from "../components/Layout";
//redux
import { wrapper } from "../store/index";
import theme from "../styles/theme";

function WrappedApp({ Component, pageProps }: AppProps): ReactElement {
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default wrapper.withRedux(WrappedApp);
