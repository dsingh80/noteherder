import React, { Component } from 'react'

import './App.css'
import Main from './Main'
import SignIn from './Signin'
import SignOut from './Signout'
import base, { auth, githubProvider, googleProvider } from './base'


class App extends Component {
  constructor() {
    super()

    this.state = {
      notes: {},
      currentNoteId: null,
      uid: null,
    }
  }

  componentWillMount() {
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler(user)
        }
      }
    )
  }

  syncNotes = () => {
    base.syncState(
      `${this.state.uid}/notes`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = `note-${Date.now()}`
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ 
      currentNoteId: note.id,
      notes })
  }

  removeNote = (note) => {
    const newNotes = {...this.state.notes};
    console.log(["New Note: ", newNotes[note.id]]);
    newNotes[note.id] = null;
    //delete newNotes[note.id];

    this.setState({
      currentNoteId: (note.id===this.state.currentNoteId?null:this.state.currentNoteId),
      notes: newNotes,
    }, () => {console.log(this.state.notes)});

  }

  signedIn = () => {
    return this.state.uid
  }

  authHandler = (userData) => {
    this.setState(
      { uid: userData.uid },
      this.syncNotes
    )
  }

  signOut = () => {
    auth
      .signOut()
      .then(() => this.setState({ uid: null }))
    
  }
  
  setCurrentNoteId = (noteId) => {
    this.setState({currentNoteId: noteId});
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNoteId: this.setCurrentNoteId,
    }
    const noteData = {
      notes: this.state.notes,
      currentNoteId: this.state.currentNoteId,
    }
    return (
      <div>
        <SignOut signOut={this.signOut} />
        <Main {...actions} {...noteData}/>
      </div>
    )
  }

  loadLogin(){
    return(
      <div>
        <SignIn name="Github" prov={githubProvider}/>
        <SignIn name="Google" prov={googleProvider}/>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        { this.signedIn() ? this.renderMain() : this.loadLogin() }
      </div>
    );
  }
}

export default App;
