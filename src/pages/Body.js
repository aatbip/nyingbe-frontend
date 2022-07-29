import React from "react";
import axios from "axios";
import "../axios/axios";

import { Modal } from "./Modal";

import "../style.global.css";

import { NoteCardUser } from "../components/NoteCardUser/NoteCardUser";

export const Body = () => {
  const [state, setState] = React.useState([]);
  const [loading, setLoading] = React.useState([]);
  const [contentViewMode, setContentViewMode] = React.useState(false);

  const [modalData, setModalData] = React.useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/user/published");
      setState(data.data);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const viewCardContent = async (id) => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/user/published/${id}`);
      setModalData(data.data);
      setContentViewMode(true);
      window.scrollTo(500, 0);
    } catch (e) {
      console.log(e);
    }
  };

  const undoCardContent = () => {
    console.log("undo")
    setContentViewMode(false);
    window.scrollTo(700, 700);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="body-container">
      {contentViewMode === true ? (
        <Modal modalData={modalData} undoCardContent={undoCardContent} />
      ) : (
        <>
          <section>
            <div className="hero-content">
              <h1>NYINGBE</h1>
              <h3>Instant Share ROAST</h3>
              <h4>Secure. Personal. Minimal.</h4>
            </div>
            <div className="hero-image">
              <img src="/hero-image.svg" alt="header photo" />
            </div>
          </section>
          <h2 style={{ marginTop: "3em" }}>Read thoughts from the community</h2>
          <div className="body-content-container">
            {state.map((data) => {
              return (
                <NoteCardUser
                  key={data._id}
                  data={data}
                  viewCardContent={() => viewCardContent(data._id)}
                />
              );
            })}
          </div>
        </>
      )}

      <div className="footer">
        <p style={{ marginTop: "5rem", color: "#5b5853" }} id="admin-signature">
          Copywrite © Aat Bip Dev 2022
        </p>
      </div>
    </div>
  );
};
