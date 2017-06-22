import React from 'react'
import { NavLink } from 'react-router-dom';

const Note = ({ note, setCurrentNote, removeNote }) => {

  return (

      <NavLink to={`/notes/${note.id}`}>
        <li>
          <div className="note">
            <div className="note-title">
              {note.title}
            </div>
            <div className="note-body">
              <p>
                {
                    note.body ? note.body.map((textObj) => textObj.insert): ""
                }
              </p>
            </div>
          </div>
        </li>
      </NavLink>
    
  )
}

export default Note