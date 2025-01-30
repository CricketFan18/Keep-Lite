import React, { useState, useEffect } from "react";
import "./Note.css";

const Note = (props) => {
  return (
    <div className="note" style={{ backgroundColor: "#d5b3ff" }}>
      <div className="pin">
        <div className="pin-inner"></div>
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button className="del-btn" onClick={(e) => {
        e.preventDefault();
        props.onDel(props.id);
      }} ><span className="material-symbols-outlined">
      delete
      </span></button>
    </div>
  );
};

export default Note;
