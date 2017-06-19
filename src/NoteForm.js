import React, { Component } from 'react';
import './NoteForm.css'

class NoteForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.currentNote!=null?this.props.notes[this.props.currentNote].title:'',
            body: this.props.currentNote!=null?this.props.notes[this.props.currentNote].body:'',
            id: Date.now(),
        }

    }

    componentWillMount(){
        this.setState(this.blankNote());
    }

    blankNote = () => { // syntax binds "this" automatically; bit dangerous though since it is going to be bound all the time
        return {
            id: Date.now(),
            title: '',
            body: '',
        }
    }

    handleChanges = (ev) => {
        const note = {...this.state};
        note[ev.target.name] = ev.target.value;

        this.setState(
            {...note}, 
            () => this.props.saveNote({...this.state})
        );
    }

    render(){
        return(
            <div className="NoteForm">
                <form>
                <p>
                    <input type="text" name="title" placeholder="Title your note" value={this.state.title} onChange={this.handleChanges} />
                </p>
                <p>
                    <textarea name="body" cols="30" rows="10" placeholder="Just start typing..." value={this.state.body} onChange={this.handleChanges}></textarea>
                </p>
                </form>
            </div>
        )
    }
}

export default NoteForm;