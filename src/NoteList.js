import React from 'react'

import './NoteList.css'
import Note from './Note'

const NoteList = ({ notes, setCurrentNoteId, removeNote }) => {
  return (
    <div className="NoteList">
      <h3>Notes</h3>
      <ul id="notes">
        { Object.keys(notes).map((noteId) => {
          return <Note note={notes[noteId]} setCurrentNoteId={setCurrentNoteId} removeNote={removeNote} key={noteId} />
        }) }
      </ul>
    </div>
  )
}

export default NoteList
