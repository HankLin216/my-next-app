import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useEffect, useState } from "react";
import { Typography, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import "draft-js/dist/Draft.css";

function ToolBar() {
    return;
}

function useStyles() {
    return makeStyles((theme: Theme) =>
        createStyles({
            root: {
                border: `.5px solid ${theme.palette.grey[500]}`,
                marginTop: theme.spacing(1),
                padding: theme.spacing(1),
                width: "80%"
            },
            title: {
                backgroundColor: "#fff",
                position: "relative",
                top: -18,
                left: 5,
                width: 70
            }
        })
    );
}

export default function TextDraft() {
    //state
    const [showEditor, setShowEditor] = useState<boolean>(false); //just avoid wraning data-offset-key, cauing by empty content at init
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    //
    useEffect(() => {
        setShowEditor(true);
    }, []);
    //method
    function onChange(internalEditorState: EditorState): void {
        seteditorState(internalEditorState);
        console.log(convertToRaw(editorState.getCurrentContent()));
    }
    //styles
    const classes = useStyles()();

    return (
        <div className={classes.root}>
            <Typography variant={"subtitle2"} align="center" className={classes.title}>
                商品描述
            </Typography>
            {showEditor ? (
                <Editor editorState={editorState} onChange={onChange} editorKey="foobaz"></Editor>
            ) : null}
        </div>
    );
}
