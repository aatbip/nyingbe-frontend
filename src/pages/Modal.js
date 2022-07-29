import React from "react";

import { Markup } from "interweave";

export const Modal = (props) => {
  return (
    <div className="modal-container">
      <img
        src="/delete-icon.png"
        alt="cancel button"
        onClick={() => props.undoCardContent()}
      />
      <div className="modal-content">
        <Markup content={props.modalData.text} />
      </div>
    </div>
  );
};
