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
    this.getUserFromLocalStorage();
    auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.authHandler(user)
        }
      }
    )
  }

  getUserFromLocalStorage = () => {
    const uid = localStorage.getItem('uid');
    if(!uid)
      return null;
    
    this.setState({ uid });
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
    localStorage.setItem('uid', userData.uid);
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
        
        this.resetCurrentNote();
        localStorage.removeItem('uid');
        this.setState({ uid: null });
        base.removeBinding(this.ref);
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
    let shouldRedirect = false;
    if (!note.id) {
      note.id = `note-${Date.now()}`
      shouldRedirect = true;
    }
    const notes = {...this.state.notes}
    notes[note.id] = note
    this.setState({ 
      currentNote: note,
      notes 
    })
    
    if(shouldRedirect){
      this.props.history.push(`/notes/${note.id}`);
    }
  }

  removeNote = (note) => {
    const newNotes = {...this.state.notes};
    
    newNotes[note.id] = null;

    this.setState({
      currentNote: this.blankNote(),
      notes: newNotes,
    }, this.props.history.push("/notes"));

  }
  
  setCurrentNote = (note) => {
    this.setState({currentNote: note});
  }

  resetCurrentNote = () => {
    this.setState({
      currentNote: this.blankNote(),
    }, this.props.history.push("/notes"))
    
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
