import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css'
import Main from './Main'
import SignIn from './Signin'
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
    this.ref = base.syncState(
      `notes/${this.state.uid}`,
      {
        context: this,
        state: 'notes',
      }
    )
  }

  authHandler = (userData) => {
    this.setState(
      { uid: userData.uid },
      this.syncNotes
    )
  }

  signedIn = () => {
    return this.state.uid
  }

  signOut = () => {
    auth
      .signOut()
      .then(() => {
        base.removeBinding(this.ref);
        this.resetCurrentNote();
        this.setState({ uid: null })
    })
    
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

  removeNote = (note) => {
    const newNotes = {...this.state.notes};
    
    newNotes[note.id] = null;

    this.setState({
      currentNote: this.blankNote(),
      notes: newNotes,
    });

  }
  
  setCurrentNote = (note) => {
    this.setState({currentNote: note});
  }

  resetCurrentNote = () => {
    this.setState({currentNote: this.blankNote()});
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
    const actions = {
      saveNote: this.saveNote,
      removeNote: this.removeNote,
      setCurrentNote: this.setCurrentNote,
      resetCurrentNote: this.resetCurrentNote,
      signOut: this.signOut,
    }
    const noteData = {
      notes: this.state.notes,
      currentNote: this.state.currentNote,
    }

    return (
      <div className="App">


        <Switch>

          <Route path="/notes" render={() => (
            this.signedIn()
            ?
              <Main {...actions} {...noteData}/>
            :
              <Redirect to="/sign-in" />
            )} />

          <Route path="/sign-in" render={() => (
            this.signedIn()
            ?
              <Redirect to="/notes" />
            :
              <div>
                <SignIn name="Github" prov={githubProvider}/>
                <SignIn name="Google" prov={googleProvider}/>
              </div>
          )} />

          <Route render={() => <Redirect to="/notes" />} />
          
        </Switch>
        
      </div>
    );
  }
}

export default App;
