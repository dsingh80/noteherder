import React from 'react';
import './Note.css';

class Note extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            body: this.props.body,
        }

        this.updateForm = this.updateForm.bind(this);
    }

    updateForm(ev){
        this.props.onNoteClick(this.state);
    }

    render(){
        return(
            <li className="Note" onClick={this.updateForm}>
                <div className="note">
                    <div className="note-title">
                        {this.state.title}
                    </div>
                    <div className="note-body">
                        <p>
                            {this.state.body}
                        </p>
                    </div>
                </div>
                <button className="button-delete" onClick={this.props.onNoteDelete}>
                    <i className="fa fa-ban" aria-hidden="true"></i>
                </button>
            </li>
        )
    }
}

export default Note;