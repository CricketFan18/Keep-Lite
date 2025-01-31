import React, { useState,useRef,useEffect } from "react";
import "./CreateNote.css";

function CreateNote(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    color: ""
  });

  const bgColor = ["#a7f8ef","#f7fa6d","#d5b3ff","#f086be"];

  function chooseBgColor() {
    let index = Math.floor(Math.random() * 4);
    return bgColor[index];
  }

  const noteRef = useRef(null); 

  function handleClickOutside(event) {
    // console.log(noteRef.current)
    // console.log(event.target)
    if (noteRef.current && !noteRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    //console.log("mounted");
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      //console.log("unmounted");
    };
  }, []);

  function handleClick() {
    setIsExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    const newNote = {
      title: note.title,
      content: note.content,
      color: chooseBgColor()
    }
    props.onAdd(newNote);
    setIsExpanded(false);
    setNote({
      title: "",
      content: "",
      color: ""
    });
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="create-note"
        onClick={handleClick}
        ref={noteRef}
      >
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}

        <textarea
          name="content"
          type="text"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          onChange={handleChange}
          value={note.content}
        />
        {isExpanded && (
          <button type="submit" className="add-btn">
            +
          </button>
        )}
      </form>
    </>
  );
}

export default CreateNote;
