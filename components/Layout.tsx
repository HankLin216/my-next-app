//material
import {
    AppBar,
    Button,
    Collapse,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//icons
import { Menu as MenuIcon } from "@material-ui/icons";
import { ReactElement, ReactNode, useEffect, useState } from "react";

//initialization
const appbarHeight = 50;
const drawerWidth = 250;
const drawerItems = [
    {
        Label: "Item1",
        to: "/Item1"
    },
    {
        Label: "Item2",
        to: "/Item2"
    },
    {
        Label: "Item3",
        open: false,
        subList: [
            {
                Label: "subItem1",
                to: "/Item3/subItem1"
            },
            {
                Label: "subItem2",
                to: "/Item3/subItem2"
            }
        ]
    }
];
//Layout
interface StyleProps {
    windowsHeight: number;
}

const useStyles = (props: StyleProps) =>
    makeStyles((theme: Theme) =>
        createStyles({
            //appBar
            appBar: {
                height: appbarHeight,
                backgroundImage: "linear-gradient(30deg, #020024, #090979, #00d4ff)"
            },
            toolBar: {
                minHeight: appbarHeight
            },
            menuButton: {
                marginRight: theme.spacing(2)
            },
            title: {
                flexGrow: 1
            },
            //drawer
            drawer: {
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth
                }
            },
            //main
            main: {
                height: props.windowsHeight - appbarHeight
            }
        })
    );

interface LayoutProps {
    children: ReactNode;
}

const Layout = (props: LayoutProps): ReactElement => {
    const [windowsHeight, setWindowsHeight] = useState<number>(0);
    //
    useEffect(() => {
        const windowsHeight = window.innerHeight;

        setWindowsHeight(windowsHeight);
    }, []);
    //

    const classes = useStyles({ windowsHeight })();

    return (
        <>
            {/* navigation */}
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        MS
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {/* Drawer */}
            <Drawer open={true} className={classes.drawer}>
                <List>
                    {drawerItems.map((item) =>
                        Object.prototype.hasOwnProperty.call(item, "subList") ? (
                            <div key={item.Label}>
                                <ListItem button>
                                    <ListItemText primary={item.Label}></ListItemText>
                                </ListItem>
                                <Collapse in={item.open}>
                                    <List>
                                        {item.subList?.map((subitem) => {
                                            <ListItem key={item.Label} button>
                                                <ListItemText>{subitem.Label}</ListItemText>
                                            </ListItem>;
                                        })}
                                    </List>
                                </Collapse>
                            </div>
                        ) : (
                            <ListItem key={item.Label} button>
                                <ListItemText primary={item.Label}></ListItemText>
                            </ListItem>
                        )
                    )}
                </List>
            </Drawer>
            {/* main */}
            <main style={{ border: "3px solid red" }} className={classes.main}>
                {props.children}
            </main>
        </>
    );
};

export default Layout;
