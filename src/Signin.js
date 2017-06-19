import React from 'react';
import './Signin.css';

const Signin = (props) => {
    return(
        <button className="Signin" onClick={props.onSignIn}> 
            Signin with Github
        </button>
    )
}

export default Signin;