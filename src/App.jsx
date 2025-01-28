import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Note from './components/Note'
import notes from './notes'



function App() {
  return (
    <>
    <Navbar />
    <div className='container'>
      {notes.map(note => <Note key={note.key} title={note.title} content={note.content} /> ) }
    </div>
    <Footer/>
    </>
  )
}

export default App
