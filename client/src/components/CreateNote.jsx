import React, { useState, useRef, useEffect } from "react";
import "./CreateNote.css";
import ColorChange from "./ColorChange";

function CreateNote(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState( props.edit || {title: "",content: "",color: "",});

  const noteRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(()=> {
    if(props.edit) {
      setIsExpanded(true);
      setNote(props.edit);
      textareaRef.current.focus();
    }
  },[props.edit])

  function handleClick() {
    setIsExpanded(true);
  }

  function handleColor(id) {
    setNote((prev) => ({ ...prev, color: id }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNote((prev) => ({ ...prev, [name]: value }));
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }

  function handleClickOutside(event) {
    if (noteRef.current && !noteRef.current.contains(event.target)) {
      setIsExpanded(false);
    }
    if(textareaRef.current.textContent === "") {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newNote = {
      title: note.title,
      content: note.content,
      color: note.color === "" ? "#a7f8ef" : note.color,
    };
    props.onAdd(newNote);
    setIsExpanded(false);
    setNote({
      title: "",
      content: "",
      color: "",
    });
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; 
    }
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
          ref={textareaRef}
          name="content"
          type="text"
          placeholder="Take a note..."
          rows={isExpanded ? "3" : "1"}
          onChange={handleChange}
          value={note.content}
        />
        {isExpanded && (
          <>
            <ColorChange addColor={handleColor} onEdit={note.color} />
            <button type="submit" className="add-btn">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "34px" }}
              >
                add_circle
              </span>
            </button>
          </>
        )}
      </form>
    </>
  );
}

export default CreateNote;
