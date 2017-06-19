import React, { Component } from 'react';
import './App.css';

import Main from './Main.js'
import SignIn from './Signin.js';
import SignOut from './Signout.js'
import base from './base.js';

class App extends Component {
  constructor(){
    
    super();

    this.state = {
      uid: 'dsingh80',
    }
  }

  componentWillMount(){
      base.syncState(
          'notes',
          {
              context: this,
              state: "notes"
          }
      )
  }

  signedIn() {
    return this.state.uid;
  }
  
  signOut = () => {
    this.setState({uid: null});
  }

  signIn = () => {
    this.setState({uid: "dsingh80"});
  }

  authHandler = (userData) => {
    this.setState({
      uid: userData.uid,
    })
  }

  render() {
    return (
      <div className="App">
        {this.signedIn() ? <SignOut onSignOut={this.signOut} /> : <SignIn onSignIn={this.signIn}/>}
        {this.signedIn() ? <Main /> : null}
      </div>
    );
  }
}

export default App;
