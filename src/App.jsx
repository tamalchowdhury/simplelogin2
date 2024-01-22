import React from 'react'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAe5hM_oNjeizF2ESBGTtl8bWtzUvCCatE',
  authDomain: 'simple-login-4ebae.firebaseapp.com',
  projectId: 'simple-login-4ebae',
  storageBucket: 'simple-login-4ebae.appspot.com',
  messagingSenderId: '746918235872',
  appId: '1:746918235872:web:24410233850db1aa164a85',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

function Form({ formFn, submitButton }) {
  function handleFormSubmit(event) {
    event.preventDefault()

    const { email, password } = event.target.elements

    formFn({
      email: email.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <input type="email" id="email" />
      </div>
      <div>
        <input type="password" id="password" />
      </div>
      <button type="submit">{submitButton}</button>
    </form>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [loadingState, setLoadingState] = React.useState('idle') // idle, loading, success, error
  const [error, setError] = React.useState(null)

  function login(formData) {
    console.log('Login', formData)
  }

  function register(formData) {
    const { email, password } = formData

    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => {
        setUser(userData.user)
        setIsLoggedIn(true)
      })
      .catch((err) => {
        setError(err)
      })

    console.log('register', formData)
  }

  function logout() {}

  function UnAuthenticatedApp() {
    return (
      <>
        <h3>Login</h3>
        <Form formFn={login} submitButton="Login" />
        <h3>Register</h3>
        <Form formFn={register} submitButton="Register" />
      </>
    )
  }

  function AuthenticatedApp() {}

  return (
    <div className="App">
      <div className="header">
        <h1>Simple App</h1>
        {isLoggedIn ? <AuthenticatedHeader /> : null}
      </div>
      <main className="content">
        {isLoggedIn ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
      </main>
    </div>
  )
}

function AuthenticatedHeader() {
  return (
    <>
      <p>Hello Tamal</p>
      <button className="button" type="button">
        Logout
      </button>
    </>
  )
}

export default App
