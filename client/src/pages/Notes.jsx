import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import api from "../api/apiHandler";

export default function App() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null); // currently editing note
  const [loading, setLoading] = useState(false);

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
      if (edit) {
        // If editing, send PUT request
        await api.put(`/notes/${edit._id}`, {
          title: item.title,
          content: item.content,
          color: item.color,
        });
        setEdit(null); // clear edit state
      } else {
        // Otherwise, create a new note
        await api.post("/notes/create", {
          title: item.title,
          content: item.content,
          color: item.color,
        });
      }

      await fetch();
    } catch (err) {
      console.error("Error adding/updating note:", err);
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

  function editItem(note) {
    setEdit(note);
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
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            color={note.color}
            onEdit={(id) => setEdit(items.find((n) => n._id === id))}
            onDel={deleteItem}
            isEditing={edit?._id === note._id}
          />
        ))}
      </div>

      <Footer />
    </>
  );
}
