import React from 'react'
import "./Note.css"


const Note = (props) => {

  return (
    <div className='note'>
      <div className='pin'>
        <div className='pin-inner'></div>
      </div>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
    </div>
  )
}

export default Note
