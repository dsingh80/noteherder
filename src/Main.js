import React from 'react'

import SideBar from './SideBar.js'
import NoteList from './NoteList.js'
import NoteForm from './NoteForm.js'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: '',
        }

        this.updateForm = this.updateForm.bind(this);
    }

    updateForm(title, body){
        this.setState({
            title: title,
            body: body,
        })
    }

    render(){
        return(
            <div className="Main">
                <SideBar />
                <NoteList onNoteClick={this.updateForm} />
                <NoteForm title={this.state.title || ""} body={this.state.body || ""} />
            </div>
        )
    }
}

export default Main;