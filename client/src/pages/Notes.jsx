import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import { fetch, addItem, deleteItem } from "../api/notesApi";

function App() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState();

  useEffect(() => {
    fetch(setItems);
  }, []);

  function editItem(id) {
    setEdit(items.find((item) => item["_id"] === id));
    deleteItem(id);
  }

  return (
    <>
      <Navbar />
      <CreateNote onAdd={addItem} edit={edit} />
      <div className="container">
        {items.map((note) => (
          <Note
            key={note["_id"]}
            id={note["_id"]}
            title={note.title}
            content={note.content}
            color={note.color}
            onEdit={editItem}
            onDel={deleteItem}
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
