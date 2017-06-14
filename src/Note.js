import React from 'react';

class Note extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            body: this.props.body,
        }
    }

    render(){
        return(
            <li>
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
            </li>
        )
    }
}

export default Note;