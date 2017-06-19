import React from 'react'

import './Main.css'
import SideBar from './SideBar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
  return (
    <div className="Main">
      <SideBar />
      <NoteList notes={props.notes} setCurrentNoteId={props.setCurrentNoteId} removeNote={props.removeNote}/>
      <NoteForm {...props} />
    </div>
  )
}

export default Main
