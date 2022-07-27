import React from "react";

import { UserDashboardContext } from "../../contexts/userDashboardContexts/userDashboard.context";

import { Markup } from "interweave";

import "./style.notecard.css";

export const NoteCard = (props) => {
  const { openNote, deleteNote } = React.useContext(UserDashboardContext);

  const textData = `<span> ${props.data.text.slice(0, 180)} ...... </span> `;

  return (
    <div className="card">
      <img
        className="delete-icon"
        onClick={() => deleteNote(props.data._id)}
        src="/delete-icon.png"
        alt="icon to remove"
      />
      <div className="card-title">
        <h3 onClick={() => openNote(props.data._id)}>{props.data.title}</h3>
      </div>
      <hr />
      <div className="card-content">
          <Markup content={`${textData}`} />
      </div>
    </div>
  );
};
