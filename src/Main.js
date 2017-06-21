import React from 'react'
import { Route, Switch } from 'react-router-dom';

import './Main.css'
import SideBar from './SideBar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'

const Main = (props) => {
  return (
    <div className="Main">
      <SideBar resetCurrentNote={props.resetCurrentNote} signOut={props.signOut}/>
      <NoteList notes={props.notes}/>
      <Switch>
        <Route path="/notes/:id" render={(routerProps)=><NoteForm {...props} routerProps={routerProps}/>} />
        <Route render={()=><NoteForm {...props}/>} />
      </Switch>
    </div>
  )
}

export default Main
