import React from 'react'

import './Signout.css';

const Signout = (props) => {

    return(
        <button className="Signout" onClick={props.onSignOut}>
            Sign Out of Github
        </button>
    )
}

export default Signout;