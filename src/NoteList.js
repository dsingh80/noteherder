import React from 'react'
import './NoteList.css'

import Note from './Note.js'

class NoteList extends React.Component{

    constructor(props){
      super(props);
      this.state = {
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

    }

    addNote(note, key){
      return <Note title={note.title} body={note.body} key={key} />
    }

    render(){
      return(
        <div className="NoteList">
          <h3>Notes</h3>
          <ul id="notes">
            {this.state.notes.map((note, key) => <Note title={note.title} body={note.body} key={key} />)}
          </ul>
        </div>
      )
    }
}

export default NoteList