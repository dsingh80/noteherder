import React, { Component } from 'react';
import './NoteForm.css'

class NoteForm extends Component{
    constructor(props){
        super(props);

        console.log(this.props);

        this.state = {
            title: this.props.title,
            note: this.props.body,
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleNoteChange = this.handleNoteChange.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            title: newProps.title,
            note: newProps.body,
        })
    }
    
    handleTitleChange(ev){
        const newState = [...this.state]
        const newTitle = ev.target.value;

        newState.title = newTitle;

        this.setState(newState); 
    }

    handleNoteChange(ev){
        const newState = [...this.state]
        const newNote = ev.target.value;

        newState.note = newNote;

        this.setState(newState); 
    }

    render(){
        return(
            <div className="NoteForm">
                <form>
                <p>
                    <input type="text" name="title" placeholder="Title your note" value={this.state.title} onChange={this.handleTitleChange} />
                </p>
                <p>
                    <textarea name="body" cols="30" rows="10" placeholder="Just start typing..." value={this.state.note} onChange={this.handleNoteChange}></textarea>
                </p>
                </form>
            </div>
        )
    }
}

export default NoteForm;