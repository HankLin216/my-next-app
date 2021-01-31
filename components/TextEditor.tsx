import "react-quill/dist/quill.snow.css";

import { createStyles, makeStyles } from "@material-ui/styles";
import React, { ReactElement, useState } from "react";
import ReactQuill, { Quill } from "react-quill";

const Size = Quill.import("attributors/style/size");
const fontSizes: string[] = [];
for (let i = 12; i < 60; i++) {
    if (i % 4 === 0) fontSizes.push(i + "px");
}
Size.whitelist = fontSizes;
Quill.register(Size, true);

const Font = Quill.import("attributors/style/font");
const fontStyle = [
    "arial",
    "comic-sans",
    "courier-new",
    "georgia",
    "helvetica",
    "lucida",
    "Times New Roman"
];
Font.whitelist = fontStyle;
Quill.register(Font, true);

function ToolBar(): ReactElement {
    return (
        <div id="toolbar">
            {/* <!-- Add font size dropdown --> */}
            <select className="ql-font" defaultValue={"arial"} style={{ width: "150px" }}>
                {fontStyle.map((s) => {
                    return (
                        <option key={`font-${s}`} value={s}>
                            {s.substring(0, 1).toUpperCase() + s.replace(/-/, " ").substring(1)}
                        </option>
                    );
                })}
            </select>
            <select className="ql-size" defaultValue={"20px"}>
                {fontSizes.map((s) => {
                    return (
                        <option key={`size-${s}`} value={s}>
                            {s.substring(0, s.indexOf("p"))}
                        </option>
                    );
                })}
            </select>
            <span className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
                <button className="ql-clean" />
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-indent" value="-1" />
                <button className="ql-indent" value="+1" />
            </span>
            <span className="ql-formats">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>
            <span className="ql-formats">
                <button className="ql-link" />
                <button className="ql-image" />
                {/* <button className="ql-video" /> */}
            </span>
        </div>
    );
}
const toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"] // remove formatting button
];

const useStyles = () =>
    makeStyles(() =>
        createStyles({
            root: {
                "& .ql-container": {
                    fontSize: "20px"
                },
                "& .ql-editor": {
                    height: 400
                }
            }
        })
    );

export interface PropsType {
    handleUpdateProductDescription: (value: string) => void;
}

export default function TextEditor(props: PropsType): ReactElement {
    const [value, setValue] = useState("");
    const classes = useStyles()();
    return (
        <div className={classes.root}>
            <ToolBar></ToolBar>
            <ReactQuill
                theme="snow"
                modules={{
                    toolbar: "#toolbar"
                }}
                value={value}
                onChange={setValue}
                onBlur={(previousRange, source, editor) => {
                    // console.log(editor.getHTML()); // use this
                    props.handleUpdateProductDescription(editor.getHTML());
                }}
            />
        </div>
    );
}
