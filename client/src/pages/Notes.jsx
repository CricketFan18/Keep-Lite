import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import api from "../api/apiHandler";

function App() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState();

  async function fetch() {
    const res = await api.get("/notes");
    if (res.data.success) {
      setItems(res.data.result);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  async function addItem(item) {
    const res = await api.post("/notes/create", {
      title: item.title,
      content: item.content,
      color: item.color,
    });
    console.log(res);
    await fetch();
  }

  async function deleteItem(id) {
    const res = await api.delete(`/notes/${id}`);
    console.log(res);
    await fetch();
  }
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
