import React from 'react'

import './Signin.css'
import { auth } from './base' //, githubProvider, googleProvider }

const SignIn = (props) => {
  const authenticate = () => {
    auth.signInWithPopup(props.prov)
  }

  return (
    <button
      className="SignIn"
      onClick={authenticate}
    >
      Sign In With {props.name}
    </button>
  )
}

export default SignIn
