//next
//material
//
import { clearTheCookies } from "@lib/client/cookies";
import {
    AppBar,
    Collapse,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
//icons
import { AccountCircle, ExpandLess, ExpandMore, Home, Menu as MenuIcon } from "@material-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, ReactElement, ReactNode, useReducer, useState } from "react";
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
        Label: "Home",
        to: "/home"
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
        Label: "Management",
        open: false,
        subList: [
            {
                Label: "Add Product",
                to: "/Management/addProduct"
            }
        ]
    },
    {
        Label: "Products",
        open: false,
        subList: [
            {
                Label: "Gun",
                to: "/Products/Gun"
            }
        ]
    },
    {
        Label: "Test",
        open: false,
        subList: [
            {
                Label: "MyMaterialTable",
                to: "/test/MyMaterialTable"
            },
            {
                Label: "MyHandsonTable",
                to: "/test/MyHandsonTable"
            },
            {
                Label: "MyHandsonTable2",
                to: "/test/MyHandsonTable2"
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
    drawerOpen: boolean;
}

const useStyles = (props: StyleProps) =>
    makeStyles((theme: Theme) =>
        createStyles({
            //appBar
            appBar: {
                height: appbarHeight,
                // backgroundImage: "linear-gradient(30deg, #020024, #090979, #00d4ff)",
                backgroundColor: theme.palette.background.default,
                width: props.drawerOpen ? `calc(100% - ${drawerWidth}px)` : "100%",
                marginLeft: props.drawerOpen ? drawerWidth : 0,
                transition: theme.transitions.create(["margin", "width"], {
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
            buttonTitle: {
                color: "#fff",
                marginLeft: "auto",
                marginRight: "auto",
                textAlign: "center"
            },
            iconButtonwrapper: {
                position: "relative",
                "&:hover": {
                    "& .silder": {
                        borderBottom: "2px solid white",
                        position: "absolute",
                        width: "100%"
                    }
                }
            },
            //drawer
            drawer: {
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth
                }
            },
            drawerSubListPanel: {
                backgroundColor: theme.palette.background.default
            },
            drawerSubList: {
                "& .MuiListItemText-root": {
                    paddingLeft: 30
                }
            },
            //main
            main: {
                marginLeft: props.drawerOpen ? drawerWidth : 0,
                height: `calc(100% - ${appbarHeight}px)`,
                transition: theme.transitions.create(["margin", "width"], {
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
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [drawerItemState, dispatch] = useReducer(drawerReducer, drawerItems, initDrawerState);
    const [userMenuAnchorEl, setuserMenuAnchorEl] = useState<null | HTMLElement>(null);
    //next
    const router = useRouter();
    //style
    const classes = useStyles({ drawerOpen })();
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
    function handleUserMenuIconClick(event: MouseEvent<HTMLButtonElement>): void {
        setuserMenuAnchorEl(event.currentTarget);
    }
    function handleUserMenuIconClose(): void {
        setuserMenuAnchorEl(null);
    }
    function handleUserMenuItemClick(event: MouseEvent<HTMLLIElement>): void {
        const actBtn = event.currentTarget.innerText;
        switch (actBtn.toUpperCase()) {
            case "LOGOUT":
                clearTheCookies();
                router.push("/");
                break;
        }
        setuserMenuAnchorEl(null);
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
                    <Link href={"/"} passHref>
                        <IconButton className={classes.buttonTitle}>
                            <Typography variant="h6">MS</Typography>
                        </IconButton>
                    </Link>
                    {/* userIcon */}
                    <div className={classes.iconButtonwrapper}>
                        <IconButton onClick={handleUserMenuIconClick}>
                            <AccountCircle></AccountCircle>
                        </IconButton>
                        <div className={"silder"}></div>
                    </div>
                </Toolbar>
            </AppBar>
            {/* Menu */}
            <Menu
                keepMounted
                anchorEl={userMenuAnchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                getContentAnchorEl={null}
                open={Boolean(userMenuAnchorEl)}
                onClose={handleUserMenuIconClose}>
                <MenuItem onClick={handleUserMenuItemClick}>Logout</MenuItem>
                <MenuItem onClick={handleUserMenuItemClick}>User Setting</MenuItem>
            </Menu>
            {/* Drawer */}
            <Drawer open={drawerOpen} variant="persistent" className={classes.drawer}>
                <List>
                    {drawerItems.map((item) =>
                        Object.prototype.hasOwnProperty.call(item, "subList") ? (
                            <div key={item.Label}>
                                <ListItem button onClick={handleListItemClick}>
                                    <ListItemText primary={item.Label}></ListItemText>
                                    {drawerItemState[item.Label] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse
                                    in={drawerItemState[item.Label]}
                                    className={classes.drawerSubListPanel}>
                                    <List className={classes.drawerSubList}>
                                        {item.subList?.map((subitem) => {
                                            return (
                                                <Link
                                                    key={subitem.Label}
                                                    href={subitem.to || "/404"}
                                                    passHref>
                                                    <ListItem button component="a">
                                                        <ListItemText
                                                            primary={subitem.Label}></ListItemText>
                                                    </ListItem>
                                                </Link>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            </div>
                        ) : (
                            <Link key={item.Label} href={item.to || "/404"} passHref>
                                <ListItem key={item.Label} button component="a">
                                    <ListItemText primary={item.Label}></ListItemText>
                                </ListItem>
                            </Link>
                        )
                    )}
                </List>
            </Drawer>
            {/* main */}
            <main className={classes.main}>{props.children}</main>
        </>
    );
};

export default Layout;
