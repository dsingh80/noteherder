import React from 'react'
import './NoteList.css'

import Note from './Note.js'

class NoteList extends React.Component{

    constructor(props){
      super(props);
      this.state = {
        notes: this.props.notes,
      }

      this.deleteNote = this.deleteNote.bind(this);

    }

    componentWillReceiveProps(newProps){
        this.setState({
            notes: newProps.notes,
        })
    }

    deleteNote(ev){
      const listItem = ev.currentTarget.parentNode;
      const newNotes = [...this.state.notes];

      for(let i=0; i<newNotes.length; i++){
        if(newNotes[i].title === listItem.querySelector('.note-title').textContent){
          newNotes.splice(i, 1);
          listItem.remove();
          break;
        }
      }
    }

    render(){
      return(
        <div className="NoteList">
          <h3>Notes</h3>
          <ul id="notes">
            {this.state.notes.map((note, key) => <Note title={note.title} body={note.body} key={key} onNoteClick={this.props.onNoteClick} onNoteDelete={this.deleteNote} />)}
          </ul>
        </div>
      )
    }
}

export default NoteList