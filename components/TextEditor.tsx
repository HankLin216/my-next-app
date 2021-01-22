import "react-quill/dist/quill.snow.css";

import React, { ReactElement } from "react";
import ReactQill from "react-quill";

interface State {
    text: string;
}

class TextEditor extends React.Component<unknown, State> {
    constructor(props: unknown) {
        super(props);
        this.state = { text: "" };
        this.handleChange = this.handleChange.bind;
    }

    handleChange(value: string): void {
        this.setState({
            text: value
        });
    }
    render(): ReactElement {
        return <ReactQill value={this.state.text} onChange={this.handleChange}></ReactQill>;
    }
}

export default TextEditor;
