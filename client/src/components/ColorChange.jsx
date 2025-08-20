import React, { useState } from "react";
import "./ColorChange.css";

function ColorChange(props) {
  const [choice, setChoice] = useState(false);
  const [color, setColor] = useState( props.onEdit || "#a7f8ef");

  return (
    <div
      className="color-palette"
      onClick={(event) => {        
        const { id } = event.target;
        if(id) {
          setColor(id);
          props.addColor(id);
          setChoice(false);
        } else {
          setChoice(true);
        }
        
      }}
      onMouseOver={() => {
        setChoice(true);
      }}
      onMouseOut={() => {
        setChoice(false);
      }}
    >
      {!choice && (
        <div
          className="color-box op-def"
          style={{ backgroundColor: color }}
        ></div>
      )}
      {choice && (
        <>
          <div id="#a7f8ef" className="color-box op-1"></div>
          <div id="#f7fa6d" className="color-box op-2"></div>
          <div id="#d5b3ff" className="color-box op-3"></div>
          <div id="#f086be" className="color-box op-4"></div>
        </>
      )}
    </div>
  );
}

export default ColorChange;
