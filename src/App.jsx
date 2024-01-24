import React from 'react'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

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
    <div className="form">
      <h3>{submitButton}</h3>
      <form onSubmit={handleFormSubmit}>
        <div>
          <input type="email" id="email" />
        </div>
        <div>
          <input type="password" id="password" />
        </div>
        {submitButton === 'Login' ? (
          <div className="forgot-byline">
            <a href="#">Forgot Password?</a>
          </div>
        ) : null}
        <div>
          <button type="submit">{submitButton}</button>
        </div>
      </form>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [loadingState, setLoadingState] = React.useState('idle') // idle, loading, success, error
  const [error, setError] = React.useState(null)
  const [token, setToken] = React.useState(
    undefined || localStorage.getItem('token')
  )

  React.useEffect(() => {
    if (!token) return
  }, [])

  function handleLoginState(userData) {
    setUser(userData.user)
    setIsLoggedIn(true)
    setToken(userData.user.accessToken)
    localStorage.setItem('token', userData.user.accessToken)
    setLoadingState('success')
  }

  function login(formData) {
    const { email, password } = formData

    signInWithEmailAndPassword(auth, email, password)
      .then((userData) => handleLoginState(userData))
      .catch((err) => {
        setError(err)
      })
  }

  function register(formData) {
    const { email, password } = formData

    createUserWithEmailAndPassword(auth, email, password)
      .then((userData) => handleLoginState(userData))
      .catch((err) => {
        setError(err)
      })
  }

  function logout() {
    signOut(auth).then(() => {
      setIsLoggedIn(false)
      setUser(null)
    })
  }

  function UnAuthenticatedApp() {
    return (
      <>
        <Form formFn={login} submitButton="Login" />
        <Form formFn={register} submitButton="Register" />
      </>
    )
  }

  function AuthenticatedApp() {
    return (
      <>
        <h2>Hello {user?.email}!</h2>
        <p>This is your dashboard</p>
      </>
    )
  }

  function AuthenticatedHeader() {
    return (
      <>
        <p>Hello {user?.email}</p>
        <button className="button" type="button" onClick={logout}>
          Logout
        </button>
      </>
    )
  }

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

export default App
