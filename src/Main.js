import React from 'react'

import SideBar from './SideBar.js'
import NoteList from './NoteList.js'
import NoteForm from './NoteForm.js'

const Main = () => {
    return(
        <div className="Main">
            <SideBar />
            <NoteList />
            <NoteForm />
        </div>
    )
}

export default Main;