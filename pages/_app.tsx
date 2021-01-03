//styles
import "../styles/globals.css";

//theme
import { ThemeProvider } from "@material-ui/core/styles";
//next
import { NextPage } from "next";
import { Router } from "next/dist/client/router";
import Head from "next/head";
import { ReactElement, ReactNode, useEffect } from "react";

//redux
//layout
import Layout from "../components/Layout";
import theme from "../material-styles/theme";
import { wrapper } from "../store/index";

//Layout && custome type
type PageWithMainLayoutType = NextPage & { layout: typeof Layout };
// type PageWithSecondLayoutType = NextPage & { layout: typeof SecondLayout };
type PageWithLayoutType = PageWithMainLayoutType; // | PageWithSecondLayoutType;

const NoLayout = (props: { children: ReactNode }) => {
    return <>{props.children}</>;
};

type AppLayoutProps = {
    Component: PageWithLayoutType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pageProps: any;
    router: Router;
};

// eslint-disable-next-line no-unused-vars
function WrappedApp({ Component, pageProps, router }: AppLayoutProps): ReactElement {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector("#jss-server-side");
        if (jssStyles) {
            (jssStyles.parentElement as HTMLElement).removeChild(jssStyles);
        }
    }, []);

    const Layout = Component.layout || NoLayout;
    return (
        <>
            <Head>
                <title>My web</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                {/* for draft.js */}
                <meta charSet="utf-8" />
            </Head>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
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
