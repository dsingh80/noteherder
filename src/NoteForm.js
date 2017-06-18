import React, { Component } from 'react';
import './NoteForm.css'

class NoteForm extends Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.currentNote!=null?this.props.notes[this.props.currentNote].title:'',
            body: this.props.currentNote!=null?this.props.notes[this.props.currentNote].body:'',
        }

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({
            title: newProps.currentNote!=null ? newProps.notes[newProps.currentNote].title : '',
            body: newProps.currentNote!=null ? newProps.notes[newProps.currentNote].body : '',
        })
    }
    
    handleTitleChange(ev){
        const newState = [...this.state]
        const newTitle = ev.target.value;
        newState.title = newTitle;

        console.log(newTitle);
        this.setState(newState, () => {
            const currentNote = this.props.notes[this.props.currentNote]
            if(currentNote){
                if(this.state.title !== currentNote.title){
                    this.props.saveNote({
                        title: newTitle,
                        body: this.state.body,
                    });
                }
            }
        });
        
    }

    blankNote = () => { // syntax binds "this" automatically; bit dangerous though since it is going to be bound all the time
        return {
            id: null,
            title: '',
            body: '',
        }
    }

    handleChanges = (ev) => {
        const note = {...this.state};
        note[ev.target.name] = ev.target.value

        this.setState({...note}, () => this.props.saveNote({...this.state}));
    }

    handleBodyChange(ev){
        const newState = [...this.state]
        const newBody = ev.target.value;

        newState.body = newBody;

        this.setState(newState);
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