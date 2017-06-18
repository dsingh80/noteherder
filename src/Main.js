import React from 'react'

import SideBar from './SideBar.js'
import NoteList from './NoteList.js'
import NoteForm from './NoteForm.js'

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            currentNote: null,
            notes:[
                {
                    title: "Citizens of distant epochs",
                    body: "Sea of Tranquility the ash of stellar alchemy vastness is bearable only through love bits of moving fluff are creatures of the cosmos, consciousness a still more glorious dawn awaits two ghostly white figures in coveralls and helmets are soflty dancing tingling of the spine, concept of the number one brain is the seed of intelligence are creatures of the cosmos?"
                },
                {
                    title: "Preserve and cherish that pale blue dot",
                    body: "network of wormholes a billion trillion the only home we've ever known light years dream of the mind's eye. Intelligent beings!",
                },
                {
                    title: "Laws of physics",
                    body: "Cambrian explosion radio telescope, circumnavigated citizens of distant epochs brain is the seed of intelligence two ghostly white figures in coveralls and helmets are soflty dancing galaxies inconspicuous motes of rock and gas",
                },
            ],
        }

        this.updateForm = this.updateForm.bind(this);
        this.saveNote = this.saveNote.bind(this);
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
        const newNotes = [...this.state.notes]

        newNotes.push(newNote);

        this.setState({
            currentNote: this.state.notes.length,
            notes: newNotes,
            
        })
    }

    render(){
        return(
            <div className="Main">
                <SideBar />
                <NoteList notes={this.state.notes} onNoteClick={this.updateForm} />
                <NoteForm currentNote={this.state.currentNote} notes={this.state.notes} saveNote={this.saveNote} />
            </div>
        )
    }
}

export default Main;
