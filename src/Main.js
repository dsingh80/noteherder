import React from 'react'

import SideBar from './SideBar.js'
import NoteList from './NoteList.js'
import NoteForm from './NoteForm.js'
import base from './base.js';

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentNote: null,
            notes:[],
        }

        

        this.updateForm = this.updateForm.bind(this);
        this.saveNote = this.saveNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
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

    updateForm(newNote){
        let noteIndex = null;

        for(let i=0; i<this.state.notes.length; i++){
            if(this.state.notes[i].title === newNote.title){
                noteIndex = i;
                break;
            }
        }

        this.setState({
            currentNote: noteIndex,
        })
    }

    saveNote(newNote){
        const newNotes = [...this.state.notes];
        newNotes[newNote.id] = newNote; //newNotes.push(newNote);

        this.setState({
            notes: newNotes,  
        });
    }

    deleteNote(note){
        const newNotes = [...this.state.notes];
        delete newNotes[note.id];

        this.setState({
            notes: newNotes,
        })
    }

    render(){
        return(
            <div className="Main">
                <SideBar />
                <NoteList notes={this.state.notes} onNoteClick={this.updateForm} deleteNote={this.deleteNote} />
                <NoteForm currentNote={this.state.currentNote} notes={this.state.notes} saveNote={this.saveNote} />
            </div>
        )
    }
}

export default Main;
