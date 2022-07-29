import React from "react";
import axios from "axios";
import "../axios/axios";

import BounceLoader from "react-spinners/BounceLoader";

import { NoteCard } from "../components/NoteCard/NoteCard";
import { TextEditor } from "../components/TextEditor/TextEditor";

import { UserDashboardContext } from "../contexts/userDashboardContexts/userDashboard.context";
import { AppContext } from "../contexts/appContexts/app.context";

export const UserDashboard = () => {
  //Load UserDashboardContext
  const {
    notes,
    getAllNotes,
    toggleIsEditorOpen,
    isEditorOpen,
    isNoteDeleted,
    isPublished,
  } = React.useContext(UserDashboardContext);

  //Load App Context
  const { isSignedIn } = React.useContext(AppContext);

  //Local State
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/notes/getnotes");
      getAllNotes(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [isSignedIn, isEditorOpen, isNoteDeleted, isPublished]);

  const override = {
    display: "block",
    margin: "0 auto",
    top: "80px",
  };

  const dashboardContent = () => {
    if (isEditorOpen) {
      return <TextEditor />;
    }
    return (
      <div className="user-cards">
        {loading ? (
          <BounceLoader cssOverride={override} />
        ) : (
          notes.data.map((data) => {
            return <NoteCard key={data._id} data={data} />;
          })
        )}
      </div>
    );
  };

  const dashboardButton = () => {
    if (isEditorOpen) {
      return (
        <button type="button" className="btn-new" onClick={toggleIsEditorOpen}>
          BACK
        </button>
      );
    } else {
      return (
        <button type="button" className="btn-new" onClick={toggleIsEditorOpen}>
          ADD NOTE
        </button>
      );
    }
  };

  return (
    <div className="user-dashboard">
      {dashboardButton()}
      {dashboardContent()}
    </div>
  );
};
