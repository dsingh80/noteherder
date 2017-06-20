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
      currentNote: this.blankNote(),
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

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  saveNote = (note) => {
    if (!note.id) {
      note.id = `note-${Date.now()}`
      this.setCurrentNote(note);
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ 
      currentNote: note,
      notes })
  }

  saveAndNew = () => {

  }

  removeNote = (note) => {
    const newNotes = {...this.state.notes};
    console.log(["New Note: ", newNotes[note.id]]);
    newNotes[note.id] = null;
    //delete newNotes[note.id];

    this.setState({
      currentNote: (note.id===this.state.currentNote?null:this.state.currentNote),
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
  
  setCurrentNote = (note) => {
    this.setState({currentNote: note});
  }

  resetCurrentNote = () => {
    this.setState({currentNote: this.blankNote()});
  }

  renderMain = () => {
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
    }
    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
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
