import { useState,useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateNote from "./components/CreateNote";

function App() {
  // Local Storage
  const [items, setItems] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [edit,setEdit] = useState();

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(items));
  }, [items]);

  function addItem(item) {
    setItems(prev => ([item, ...prev]));
  }

  function deleteItem(id) {
    setItems(prev => {
      return prev.filter((value,index) => {
        return id !== index
      })
    });
  }
  function editItem(id) {
    setEdit(items[id]);
    deleteItem(id);
  }

  return (
    <>
      <Navbar />
      <CreateNote onAdd={addItem} edit={edit} />
      <div className="container">
        {items.map((note,index) => (
          <Note key={index} id={index} title={note.title} content={note.content} color={note.color} onEdit={editItem} onDel={deleteItem} />
        ))}
      </div>
      <Footer />
    </>
  );
}

export default App;
