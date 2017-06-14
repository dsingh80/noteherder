import React from 'react'
import Quill from './quill.svg'

import './SideBar.css'

const SideBar = () => {
    return(
        <div className="SideBar">
            
                <div className="logo">
                    <img src={Quill} alt="Noteherder" />
                </div>
                <button className="new-note">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1152887/new-hover.png" alt="New note" />
                    <img className="outline" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1152887/new.png" alt="New note" />
                </button>
            
        </div>
    )
}
export default SideBar