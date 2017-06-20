import React from 'react'

import './Main.css'
import SideBar from './SideBar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
  return (
    <div className="Main">
      <SideBar resetCurrentNote={props.resetCurrentNote}/>
      <NoteList notes={props.notes} setCurrentNote={props.setCurrentNote} removeNote={props.removeNote}/>
      <NoteForm {...props} />
    </div>
  )
}

export default Main
