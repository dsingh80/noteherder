import React from 'react'

import SideBar from './SideBar.js'
import NoteList from './NoteList.js'
import NoteForm from './NoteForm.js'


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
        const newNote = this.blankNote();
        const newNotes = [...this.state.notes];
        newNotes[newNote.id] = newNote;

        this.setState({
            currentNote: newNote.id,
            notes: newNotes,
        })
    }
    
    componentDidUpdate(){
        this.props.updateApp(this.state.notes);
    }
    
    blankNote = () => { // syntax binds "this" automatically; bit dangerous though since it is going to be bound all the time
        return {
            id: Date.now(),
            title: '',
            body: '',
        }
    }

    updateForm(newNote){

        this.setState({
            currentNote: newNote.id,
            
        })
    }

    newNote = () => {
        const newNotes = [...this.state.notes];
        const newNote = this.blankNote();
        newNotes[newNote.id] = newNote;

        console.log(newNotes);
        this.setState({
            currentNote: newNote.id,
            notes: newNotes,
        });
    }

    saveNote(newNote){
        const newNotes = [...this.state.notes];
        newNotes[newNote.id] = newNote;

        this.setState({
            currentNote: newNote.id,
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
                <SideBar onNewNote={this.newNote}/>
                <NoteList notes={this.state.notes} onNoteClick={this.updateForm} deleteNote={this.deleteNote} />
                <NoteForm currentNote={this.state.currentNote} notes={this.state.notes} saveNote={this.saveNote} />
            </div>
        )
    }
}

export default Main;
