/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import "draft-js/dist/Draft.css";

import {
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grid,
    Grow,
    Menu,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Theme,
    Typography
} from "@material-ui/core";
import { ArrowDropDown, FormatBold, FormatItalic, FormatUnderlined } from "@material-ui/icons";
import { createStyles, makeStyles } from "@material-ui/styles";
import {
    convertFromRaw,
    convertToRaw,
    DraftEditorCommand,
    DraftStyleMap,
    Editor,
    EditorState,
    Modifier,
    RichUtils
} from "draft-js";
import React, { ReactElement, useEffect, useRef, useState } from "react";

interface ToolBarProps {
    editorState: EditorState;
    handleInlineStyleClick: (command: string) => void;
    onToggleFontFamily: (fontFamily: string) => void;
}

const useToolBarStyles = () =>
    makeStyles((theme: Theme) =>
        createStyles({
            activated: {
                backgroundColor: theme.palette.grey[500]
            },
            notActivate: {
                backgroundColor: "#fff"
            }
        })
    );

function ToolBar(props: ToolBarProps) {
    const [fontFamilyMenuOpen, setFontFamilyMenuOpen] = useState<boolean>(false);
    const [currentFontFamily, setcurrentFontfamily] = useState<string>(
        Object.keys(fontFamilyStyleMap)[0]
    );
    //ref
    const anchorRef = useRef<HTMLDivElement>(null);
    //method
    function checkHasStyles(style: string) {
        const currentStyle = props.editorState.getCurrentInlineStyle();
        return currentStyle.has(style) ? classes.activated : classes.notActivate;
    }
    function handleFontFamilyChange(fontFamily: string) {
        setcurrentFontfamily(fontFamily);
        props.onToggleFontFamily(fontFamily);
    }
    function toggleFontFamilyMenuOpen() {
        setFontFamilyMenuOpen(!fontFamilyMenuOpen);
    }
    function handleFontFamilyMouseDown(e: React.MouseEvent<HTMLLIElement>) {
        e.preventDefault();
        handleFontFamilyChange(e.currentTarget.innerText);
        toggleFontFamilyMenuOpen();
    }
    //style
    const classes = useToolBarStyles()();
    return (
        <Grid container spacing={1}>
            <Grid item>
                <ButtonGroup ref={anchorRef}>
                    <Button
                        endIcon={<ArrowDropDown></ArrowDropDown>}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleFontFamilyMenuOpen();
                        }}>
                        <strong>{currentFontFamily}</strong>
                        <strong>
                            {"/目前:"}
                            {props.editorState
                                .getCurrentInlineStyle()
                                .map((r) => r)
                                .join(",")}
                        </strong>
                    </Button>
                </ButtonGroup>
                <Popper
                    open={fontFamilyMenuOpen}
                    anchorEl={anchorRef.current}
                    transition
                    disablePortal
                    style={{
                        zIndex: 1500
                    }}>
                    {({ TransitionProps }) => {
                        return (
                            <Grow {...TransitionProps}>
                                <Paper>
                                    <ClickAwayListener
                                        mouseEvent="onMouseDown"
                                        onClickAway={toggleFontFamilyMenuOpen}>
                                        <MenuList>
                                            {Object.keys(fontFamilyStyleMap).map((f) => {
                                                return (
                                                    <MenuItem
                                                        key={f}
                                                        onMouseDown={(e) =>
                                                            handleFontFamilyMouseDown(e)
                                                        }
                                                        selected={f === currentFontFamily}>
                                                        {f}
                                                    </MenuItem>
                                                );
                                            })}
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        );
                    }}
                </Popper>
            </Grid>
            <Grid item>
                <ButtonGroup>
                    <Button
                        className={checkHasStyles("BOLD")}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            props.handleInlineStyleClick("BOLD");
                        }}>
                        <FormatBold></FormatBold>
                    </Button>
                    <Button
                        className={checkHasStyles("ITALIC")}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            props.handleInlineStyleClick("ITALIC");
                        }}>
                        <FormatItalic></FormatItalic>
                    </Button>
                    <Button
                        className={checkHasStyles("UNDERLINE")}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            props.handleInlineStyleClick("UNDERLINE");
                        }}>
                        <FormatUnderlined></FormatUnderlined>
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}

function useStyles() {
    return makeStyles((theme: Theme) =>
        createStyles({
            root: {
                // border: `.5px solid ${theme.palette.grey[500]}`,
                marginTop: theme.spacing(1)
                // padding: theme.spacing(1)
                // width: `calc(80% - ${theme.spacing(2)}px)`
            },
            title: {
                backgroundColor: "#fff"
                // position: "relative",
                // top: -18,
                // left: 5,
                // width: 70
            },
            editorWrapper: {
                border: `.5px solid ${theme.palette.grey[500]}`,
                height: 300,
                overflowY: "scroll"
            }
        })
    );
}

const fontFamilyStyleMap: DraftStyleMap = {
    微軟正黑體: {
        fontFamily: "Microsoft JhengHei",
        fontSize: 50
    },
    新細明體: {
        fontFamily: "PMingLiU",
        fontSize: 50
    }
};

export default function TextDraft(): ReactElement {
    //state
    const [showEditor, setShowEditor] = useState<boolean>(false); //just avoid wraning data-offset-key, cauing by empty content at init
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    //
    useEffect(() => {
        setShowEditor(true);
        onChange(RichUtils.toggleBlockType(editorState, "20px"));
    }, []);
    //ref
    const EditorRef = useRef<Editor>(null);
    //method
    function onChange(internalEditorState: EditorState): void {
        setEditorState(internalEditorState);
        console.log(convertToRaw(editorState.getCurrentContent()));
    }
    function handleKeyCommand(command: DraftEditorCommand, editorState: EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return "handled";
        } else {
            return "not-handled";
        }
    }
    function handleInlineStyleClick(command: string) {
        onChange(RichUtils.toggleInlineStyle(editorState, command));
    }
    function focusEditor() {
        // EditorRef.current?.focus();
    }

    function toggleFontFamily(applyFontFamily: string) {
        const selection = editorState.getSelection();
        // selection.forEach((r) => console.log(r));

        // Let's just allow one color at a time. Turn off all active colors.
        const nextContentState = Object.keys(fontFamilyStyleMap).reduce(
            (contentState, fontFamily) => {
                return Modifier.removeInlineStyle(contentState, selection, fontFamily);
            },
            editorState.getCurrentContent()
        );

        const nextEditorState = EditorState.push(
            editorState,
            nextContentState,
            "change-inline-style"
        );

        const currentStyle = editorState.getCurrentInlineStyle();
        // currentStyle.forEach((r) => console.log(r));
        // Unset style override for current color.
        //粗淺一點,isCollapsed是有沒有反白,沒反白是true,有是fasle
        // if (selection.isCollapsed()) {
        //     nextEditorState = currentStyle.reduce((state, color) => {
        //         return RichUtils.toggleInlineStyle(state as EditorState, color as string);
        //     }, nextEditorState);
        // }

        // If the color is being toggled on, apply it.
        // if (!currentStyle.has(applyFontFamily)) {
        //     nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, applyFontFamily);
        // }
        const __content = Modifier.applyInlineStyle(
            editorState.getCurrentContent(),
            selection,
            applyFontFamily
        );
        const __nextEditorState = EditorState.push(
            nextEditorState,
            __content,
            "change-inline-style"
        );
        // nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, applyFontFamily);
        onChange(__nextEditorState);
    }
    //styles
    const classes = useStyles()();

    return (
        <div className={classes.root}>
            <Typography variant={"subtitle1"} align="left" className={classes.title}>
                商品描述
            </Typography>
            <ToolBar
                onToggleFontFamily={toggleFontFamily}
                editorState={editorState}
                handleInlineStyleClick={handleInlineStyleClick}></ToolBar>
            {showEditor ? (
                <div className={classes.editorWrapper} onClick={focusEditor}>
                    <Editor
                        ref={EditorRef}
                        customStyleMap={fontFamilyStyleMap}
                        editorState={editorState}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                        editorKey="foobaz"></Editor>
                </div>
            ) : null}
        </div>
    );
}
