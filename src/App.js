import React, { Component } from 'react';
import './App.css';

import SideBar from './SideBar.js'
import NoteList from './NoteList.js'
import NoteForm from './NoteForm.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <SideBar />
        <NoteList />
        <NoteForm />
      </div>
    );
  }
}

export default App;
