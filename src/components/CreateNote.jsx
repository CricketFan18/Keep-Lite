import React, { useState,useRef,useEffect } from "react";
import "./CreateNote.css";

function CreateNote(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

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
    props.onAdd(note);
    setIsExpanded(false);
    setNote({
      title: "",
      content: "",
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
