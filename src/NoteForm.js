import React, { Component } from 'react'
import Quill from 'quill';

import './NoteForm.css'
import './Quill.css'

class NoteForm extends Component {
  constructor(props){
    super(props);
    this.rte = null;
  }

  componentDidMount(){
    this.rte = new Quill('#editor', {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]
      },
      theme: 'snow'  // or 'bubble'
    });

    this.rte.on('text-change', (delta, oldDelta, source) => {
      if(source == "user"){
        const contents = this.rte.getContents();
        const textObjects = contents.ops;
        
        const note = {...this.props.currentNote}
        note.body = contents.ops;
        this.props.saveNote(note);
      }
    })
  }
  
  componentWillReceiveProps(newProps){
    
    /*if(newProps.currentNote.body){
      let delta = {
        ops: [...newProps.currentNote.body]
      }
      this.rte.setText("", "silent");
      console.log(delta);
      this.rte.updateContents(delta);
    }
    */

    if(newProps.routerProps){
      const newId = newProps.routerProps.match.params.id;
      if(newId === this.props.currentNote.id)
        return;
      const note = newProps.notes[newId];
      if(note)
        newProps.setCurrentNote(note);
    }
    
  }

  handleChanges = (ev) => {
    const note = {...this.props.currentNote}
    note[ev.target.name] = ev.target.value
    this.props.saveNote(note)
  }

  handleRemove = (ev) => {
    this.props.removeNote(this.props.currentNote)
  }

  render() {

    
    return (
      <div className="NoteForm">
        <form>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title your note"
              onChange={this.handleChanges}
              value={this.props.currentNote.title}
            />
          </p>
            <div id="editor">
            </div>
          <button
            type="button"
            onClick={this.handleRemove}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </form>
      </div>
    )
  }
}

export default NoteForm