import React from 'react'

import quill from './quill.svg'
import newHover from './new-hover.png'
import newIcon from './new.png'
import './SideBar.css'

import SignOut from './Signout.js';

const Sidebar = (props) => {

  const callBlankNote = () => {
    props.resetCurrentNote();
  }
  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={quill} alt="Noteherder" />
      </div>
      
      <button className="new-note" onClick={callBlankNote}>
        <img src={newHover} alt="New note" />
        <img className="outline" src={newIcon} alt="New note" />
      </button>

      <SignOut signOut={props.signOut} />
    </div>
  )
}

export default Sidebar
