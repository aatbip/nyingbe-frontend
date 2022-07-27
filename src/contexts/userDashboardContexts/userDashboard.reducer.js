export const reducer = (state, action) => {
  if (action.type === "GET_ALL_NOTES") {
    return {
      ...state,
      notes: action.payload,
    };
  }

  if (action.type === "TOGGLE_IS_EDITOR_OPEN") {
    return {
      ...state,
      isEditorOpen: !state.isEditorOpen,
      textEditorTitle: "",
      textEditorValue: "",
    };
  }

  if (action.type === "HANDLE_TEXT_EDITOR_VALUE") {
    return {
      ...state,
      textEditorValue: action.payload,
    };
  }

  if (action.type === "HANDLE_TEXT_EDITOR_TITLE") {
    return {
      ...state,
      textEditorTitle: action.payload,
    };
  }

  if (action.type === "HANDLE_SIGNOUT") {
    return {
      ...state,
      textEditorTitle: "",
      textEditorValue: "",
    };
  }

  if (action.type === "GET_ONE_NOTE") {
    return {
      ...state,
      isEditorOpen: !state.isEditorOpen,
      textEditorTitle: action.payload.title,
      textEditorValue: action.payload.text,
      isNoteEditable: action.payload._id,
    };
  }

  if (action.type === "DELETE_NOTE") {
    return {
      ...state,
      isNoteDeleted: true,
    };
  }
};
