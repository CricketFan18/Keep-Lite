import React from 'react'
import "./Footer.css"

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <div className='footer'>
        <p>CricketFan18 | Copyright <span className="material-symbols-outlined" style={{fontSize: "20px", position: "relative" , top: "4px" , marginLeft: "0" }} >copyright</span> {year}</p>
    </div>
  )
}

export default Footer
