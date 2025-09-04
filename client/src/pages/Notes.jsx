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
  const [loading, setLoading] = useState(false); // 👈 track loading for notes state

  async function fetch() {
    setLoading(true);
    try {
      const res = await api.get("/notes");
      if (res.data.success) {
        setItems(res.data.result);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetch();
  }, []);

  async function addItem(item) {
    setLoading(true);
    try {
      await api.post("/notes/create", {
        title: item.title,
        content: item.content,
        color: item.color,
      });
      await fetch();
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    setLoading(true);
    try {
      await api.delete(`/notes/${id}`);
      await fetch();
    } catch (err) {
      console.error("Error deleting note:", err);
    } finally {
      setLoading(false);
    }
  }

  function editItem(id) {
    setEdit(items.find((item) => item["_id"] === id));
    deleteItem(id);
  }

  return (
    <>
      <Navbar />
      <CreateNote onAdd={addItem} edit={edit} />

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Updating notes...</p>
        </div>
      )}

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
