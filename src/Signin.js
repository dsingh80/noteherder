import React from 'react';
import './Signin.css';

import { auth, githubProvider } from './base.js'

const Signin = (props) => {
    const authenticate = () => {
        auth.signInWithPopup(githubProvider)
        .then((data) => {
            console.log(data);
            props.onSignIn(data.user);
        });
    }

    return(
        <button className="Signin" onClick={authenticate}> 
            Signin with Github
        </button>
    )
}

export default Signin;