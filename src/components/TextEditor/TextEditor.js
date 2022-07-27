import React from "react";

import "./style.texteditor.css";

import { UserDashboardContext } from "../../contexts/userDashboardContexts/userDashboard.context";

import JoditEditor from "jodit-react";

import { Markup } from "interweave";

const config = {
  buttons: [
    "bold",
    "italic",
    "underline",
    "strikethrough",
    "eraser",
    "ul",
    "ol",
    "font",
    "fontsize",
    "paragraph",
    "classSpan",
    "lineHeight",
    "superscript",
    "subscript",
    "cut",
    "copy",
    "paste",
    "selectall",
    "hr",
  ],
};

export const TextEditor = () => {
  const editor = React.useRef(null);

  const {
    handleTextEditorValue,
    textEditorValue,
    textEditorTitle,
    handleTextEditorTitle,
    saveNote,
  } = React.useContext(UserDashboardContext);

  return (
    <div className="text-editor">
      <input
        className="title-box"
        placeholder="Title"
        type="text"
        value={textEditorTitle}
        onChange={(e) => {
          e.preventDefault();
          handleTextEditorTitle(e.target.value);
        }}
      />
      <JoditEditor
        ref={editor}
        onChange={(content) => handleTextEditorValue(content)}
        value={textEditorValue}
        config={config}
      />
      <button className="btn-save" type="button" onClick={saveNote}>
        Save
      </button>
    </div>
  );
};
