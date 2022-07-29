import React from "react";

import { reducer } from "./userDashboard.reducer";

import axios from "axios";
import "../../axios/axios";

const initial_state = {
  notes: [],
  loading: false,
  isEditorOpen: false,
  textEditorValue: "",
  textEditorTitle: "",
  isNoteEditable: "",
  isNoteDeleted: false,
  isPublished: false,
};

const UserDashboardContext = React.createContext();

const UserDashboardProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initial_state);

  const handleSignOut = () => {
    dispatch({ type: "HANDLE_SIGN_OUT" });
  };

  const getAllNotes = (notes) => {
    try {
      dispatch({ type: "GET_ALL_NOTES", payload: notes });
    } catch (e) {}
  };

  const toggleIsEditorOpen = () => {
    dispatch({ type: "TOGGLE_IS_EDITOR_OPEN" });
  };

  const handleTextEditorValue = (content) => {
    dispatch({ type: "HANDLE_TEXT_EDITOR_VALUE", payload: content });
  };

  const handleTextEditorTitle = (title) => {
    dispatch({ type: "HANDLE_TEXT_EDITOR_TITLE", payload: title });
  };

  const saveNote = async () => {
    if (state.isNoteEditable) {
      try {
        await axios.patch(`/notes/updatenote/${state.isNoteEditable}`, {
          title: state.textEditorTitle,
          text: state.textEditorValue,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await axios.post(`/notes/addnote`, {
          title: state.textEditorTitle,
          text: state.textEditorValue,
        });
      } catch (e) {
        console.log(e);
      }
    }
    dispatch({ type: "TOGGLE_IS_EDITOR_OPEN" });
  };

  const openNote = async (id) => {
    try {
      let { data } = await axios.get(`/notes/${id}`);
      dispatch({ type: "GET_ONE_NOTE", payload: data.data });
    } catch (e) {
      console.log(e);
    }
  };

  const deleteNote = async (id) => {
    console.log("delete");
    try {
      await axios.delete(`/notes/${id}`);
      dispatch({ type: "DELETE_NOTE" });
    } catch (e) {
      console.log(e);
    }
  };

  const publishNote = async (id) => {
    try {
      let { data } = await axios.get(`/notes/${id}`);
      if (data.data.isPublished) {
        await axios.patch(`/notes/publishnote/${id}`, {
          isPublished: false,
        });
      } else
        await axios.patch(`/notes/publishnote/${id}`, {
          isPublished: true,
        });
      dispatch({ type: "PUBLISH_NOTE" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UserDashboardContext.Provider
      value={{
        ...state,
        getAllNotes,
        toggleIsEditorOpen,
        handleTextEditorValue,
        handleTextEditorTitle,
        saveNote,
        handleSignOut,
        openNote,
        deleteNote,
        publishNote,
      }}
    >
      {children}
    </UserDashboardContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(UserDashboardContext);
};

export { UserDashboardContext, UserDashboardProvider };
