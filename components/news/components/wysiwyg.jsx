import React, { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
// import htmlToDraft from "html-to-draftjs";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

let Editor = () => null;

export default class WYSIWYG extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      editorState: EditorState.createEmpty(),
    };
  }

  componentDidMount() {
    import("react-draft-wysiwyg").then(({ Editor: WSYSIGEditor }) => {
      Editor = WSYSIGEditor;
      this.setState({ ready: true });
    });
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  render() {
    const { editorState } = this.state;
    return (
      <div
        style={{
          border: "1px solid #aaa",
          padding: 5,
          marginBottom: 10,
        }}
      >
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          wrapperStyle={{
            height: "40vh",
          }}
        />
      </div>
    );
  }
}
