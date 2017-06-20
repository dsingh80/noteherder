import React from 'react'

const Note = ({ note, setCurrentNote, removeNote }) => {
    
  const handleRemove = (ev) => {
    ev.preventDefault();
    removeNote(note);
  }

  return (
    
      <li>
        <a onClick={() => setCurrentNote(note.id)}>
          <div className="note">
            <div className="note-title">
              {note.title}
            </div>
            <div className="note-body">
              <p>
                {note.body}
              </p>
            </div>
          </div>
        </a>
        <button onClick={handleRemove}>Remove</button>
      </li>
    
  )
}

export default Note