import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import api from "../api/apiHandler";

export default function Notes() {
  const [items, setItems] = useState([]);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch only happens on load or when loading more pages
  async function fetchNotes(pageNum = 1) {
    setLoading(true);
    try {
      const res = await api.get(`/notes?page=${pageNum}`);
      if (res.data.success) {
        if (pageNum === 1) {
          setItems(res.data.result);
        } else {
          setItems((prev) => [...prev, ...res.data.result]);
        }
        setHasMore(res.data.hasMore);
      }
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes(1);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isSyncing) {
        // This triggers the browser's built-in "Are you sure you want to leave?" prompt
        e.preventDefault();
        e.returnValue = ""; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isSyncing]);

  async function addItem(item) {
    setIsSyncing(true);
    try {
      if (edit) {
        // Change it locally immediately
        setItems(items.map(n => n._id === edit._id ? { ...n, ...item } : n));
        setEdit(null); 
        
        // Let the server catch up in the background
        await api.put(`/notes/${edit._id}`, item);
      } else {
        // Create note
        const res = await api.post("/notes/create", item);
        if (res.data.success) {
          // Inject the new note straight into state
          setItems([res.data.note, ...items]); 
        }
      }
    } catch (err) {
      console.error("Error adding/updating note:", err);
      fetchNotes(1); // Only re-fetch if something actually crashed
    } finally {
      setIsSyncing(false);
    }
  }

  async function deleteItem(id) {
    setIsSyncing(true);
    // Hide it instantly!
    setItems(items.filter((note) => note._id !== id));
    
    try {
      await api.delete(`/notes/${id}`);
    } catch (err) {
      console.error("Error deleting note:", err);
      fetchNotes(1); // Revert if server fails
    } finally {
      setIsSyncing(false);
    }
  }

  return (
    <>
      <Navbar isSyncing={isSyncing} />
      <CreateNote onAdd={addItem} edit={edit} />

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

      {loading && (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading notes...</p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <button 
            className="btn" 
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              fetchNotes(nextPage);
            }}
          >
            Load More Notes
          </button>
        </div>
      )}

      <Footer />
    </>
  );
}