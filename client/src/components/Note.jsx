import "./Note.css";

export default function Note(props) {
  return (
    <div
      className={`note ${props.isEditing ? "editing" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        props.onEdit(props.id);
      }}
      style={{ backgroundColor: props.color || "#ffffff" }}
    >
      <div className="pin">
        <div className="pin-inner"></div>
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        className="del-btn"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.onDel(props.id);
        }}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
};
