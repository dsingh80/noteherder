import React, { Component } from 'react'

import './NoteForm.css'

class NoteForm extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     note: this.blankNote(),
  //   }
  // }

  // componentWillReceiveProps(newProps){
  //   let index = newProps.currentNoteId;
  //   if(!index){
  //     this.setState({note: this.blankNote()});
  //   }
  //   else if(newProps.currentNoteId !== this.state.note.id){
  //     this.setState({
  //       note: newProps.notes[index]
  //     })
  //   }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  handleChanges = (ev) => {
    const note = {...this.props.currentNote}
    note[ev.target.name] = ev.target.value
    this.props.saveNote(note)
    // this.setState(
    //   { note },
    //   () => this.props.saveNote(this.state.note)
    // ) 
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.setState({ note: this.blankNote() })
  }

  render() {
    return (
      <div className="NoteForm">
        <form onSubmit={this.handleSubmit}>
          <p>
            <input
              type="text"
              name="title"
              placeholder="Title your note"
              onChange={this.handleChanges}
              value={this.props.currentNote.title}
            />
          </p>
          <p>
            <textarea
              name="body"
              placeholder="Just start typing..."
              onChange={this.handleChanges}
              value={this.props.currentNote.body}
            ></textarea>
          </p>
        </form>
      </div>
    )
  }
}

export default NoteForm
