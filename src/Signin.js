import React from 'react'

import './Signin.css'
import { auth, githubProvider } from './base'

const SignIn = () => {
  const authenticate = () => {
    auth.signInWithPopup(githubProvider)
  }

  return (
    <button
      className="SignIn"
      onClick={authenticate}
    >
      Sign In With GitHub
    </button>
  )
}

export default SignIn
