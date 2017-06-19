import React, { Component } from 'react';
import './App.css';

import Main from './Main.js'
import SignIn from './Signin.js';
import SignOut from './Signout.js'
import base, { auth } from './base.js';

class App extends Component {
  constructor(){
    
    super();

    this.state = {
      uid: null,
      notes: [],
    }
  }

  componentWillMount(){
      auth.onAuthStateChanged((userData) => {
        if(userData)
          this.authHandler(userData);
        else
          console.log("ERROR: User not signed in");
      })
  }

  signedIn() {
    return this.state.uid;
  }
  
  signOut = () => {
    auth.signOut().then(() => {
      this.setState({uid: null});
    });
  }

  authHandler = (userData) => {
    this.setState({
      notes: [],
      uid: userData.uid,
    }, this.syncNotes)
    
  }

  syncNotes(){
    base.syncState(
        `${this.state.uid}/notes`,
        {
          context: this,
          state: "notes"
        }
    )
  }
  updateNotes = (newNotes) => {
    this.setState({notes: newNotes});
  }

  render() {
    return (
      <div className="App">
        {this.signedIn() ? <SignOut onSignOut={this.signOut} /> : <SignIn onSignIn={this.authHandler}/>}
        {this.signedIn() ? <Main updateApp={this.updateNotes}/> : null}
      </div>
    );
  }
}

export default App;
