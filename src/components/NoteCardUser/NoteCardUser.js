import React from "react";

import { Markup } from "interweave";

import "./style.notecardUser.css";

export const NoteCardUser = (props) => {
  const textData = `<span> ${props.data.text.slice(0, 450)} ...... </span> `;
  return (
    <div className="user-card">
      <div className="user-card-title">
        <h3 onClick={props.viewCardContent}>{props.data.title} </h3>
        <p>By: {props.data.userId.username}</p>
      </div>
      <hr />
      <div className="user-card-content">
        <Markup content={`${textData}`} />
      </div>
    </div>
  );
};
