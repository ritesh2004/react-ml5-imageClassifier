import React from 'react'

function Footer() {
    const date = new Date().getFullYear()
  return (
    <div className="footer">
        Copyright © {date} @Developer: Ritesh Pramanik
    </div>
  )
}

export default Footer