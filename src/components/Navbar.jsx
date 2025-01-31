import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Keep Lite </h1>{" "}
      <span
        className="material-symbols-outlined"
        style={{
          marginLeft: "0.25em",
          fontSize: "2.75rem",
          position: "relative",
          top: "0.4rem",
        }}
      >
        edit_note
      </span>
    </div>
  );
};

export default Navbar;
