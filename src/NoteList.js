import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes, setCurrentNote, removeNote }) => {
  return (
    <div className="NoteList">
      <h3>Notes</h3>
      <ul id="notes">
        { Object.keys(notes).map((noteId) => {
          return <Note note={notes[noteId]} setCurrentNote={setCurrentNote} removeNote={removeNote} key={noteId} />
        }) }
      </ul>
    </div>
  )
}

export default NoteList
