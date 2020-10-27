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
import { MouseEvent, ReactElement, ReactNode, useEffect, useReducer, useState } from "react";

//initialization
const appbarHeight = 50;
const drawerWidth = 250;
interface DrawerItems {
    Label: string;
    to?: string;
    open?: undefined | boolean;
    subList?:
        | undefined
        | {
              Label: string;
              to: string;
          }[];
}
const drawerItems: DrawerItems[] | never = [
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
    },
    {
        Label: "Item4",
        open: false,
        subList: [
            {
                Label: "subItem1",
                to: "/Item4/subItem1"
            },
            {
                Label: "subItem2",
                to: "/Item4/subItem2"
            }
        ]
    }
];
//Reducer hook
const initDrawerState = (drawerItems?: DrawerItems[]): { [key: string]: boolean } => {
    const state: { [key: string]: boolean } = {};
    if (!drawerItems) {
        return state;
    }
    for (const item of drawerItems) {
        if (Object.prototype.hasOwnProperty.call(item, "subList")) {
            state[item.Label] = false;
        }
    }
    return state;
};
const CHANGE_SUBITEM_LIST_STATE = "CHANGE_SUBITEM_LIST_STATE";
interface ChangeSubItemListState {
    type: typeof CHANGE_SUBITEM_LIST_STATE;
    payload: {
        label: string;
    };
}
type DrawerActionType = ChangeSubItemListState;

const drawerReducer = (state: { [key: string]: boolean }, action: DrawerActionType) => {
    switch (action.type) {
        case CHANGE_SUBITEM_LIST_STATE:
            return { ...state, [action.payload.label]: !state[action.payload.label] };
        default:
            return { ...state };
    }
};
//Layout
interface StyleProps {
    windowsHeight: number;
    drawerOpen: boolean;
}

const useStyles = (props: StyleProps) =>
    makeStyles((theme: Theme) =>
        createStyles({
            //appBar
            appBar: {
                height: appbarHeight,
                backgroundImage: "linear-gradient(30deg, #020024, #090979, #00d4ff)",
                width: props.drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
                marginLeft: props.drawerOpen ? drawerWidth : 0,
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                })
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
                marginLeft: props.drawerOpen ? drawerWidth : 0,
                height: props.windowsHeight - appbarHeight,
                transition: theme.transitions.create("margin", {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen
                })
            }
        })
    );

interface LayoutProps {
    children: ReactNode;
}

const Layout = (props: LayoutProps): ReactElement => {
    //state
    const [windowsHeight, setWindowsHeight] = useState<number>(0);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerItemState, dispatch] = useReducer(drawerReducer, drawerItems, initDrawerState);
    //
    useEffect(() => {
        const windowsHeight = window.innerHeight;

        setWindowsHeight(windowsHeight);
    }, []);
    //style
    const classes = useStyles({ windowsHeight, drawerOpen })();
    //method
    function handleMenuButtonClick(): void {
        setDrawerOpen(!drawerOpen);
    }
    function handleListItemClick(event: MouseEvent<HTMLDivElement>): void {
        console.log(event.currentTarget.innerText);
        dispatch({
            type: CHANGE_SUBITEM_LIST_STATE,
            payload: {
                label: event.currentTarget.innerText
            }
        });
    }
    return (
        <>
            {/* navigation */}
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenuButtonClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        MS
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {/* Drawer */}
            <Drawer open={drawerOpen} variant="persistent" className={classes.drawer}>
                <List>
                    {drawerItems.map((item) =>
                        Object.prototype.hasOwnProperty.call(item, "subList") ? (
                            <div key={item.Label}>
                                <ListItem button onClick={handleListItemClick}>
                                    <ListItemText primary={item.Label}></ListItemText>
                                </ListItem>
                                <Collapse in={drawerItemState[item.Label]}>
                                    <List>
                                        {item.subList?.map((subitem) => {
                                            return (
                                                <ListItem key={subitem.Label} button>
                                                    <ListItemText
                                                        primary={subitem.Label}></ListItemText>
                                                </ListItem>
                                            );
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
