import React from 'react'
import './App.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
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
const provider = new GoogleAuthProvider()

setPersistence(auth, browserLocalPersistence)

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

function GoogleButton({ authHandler }) {
  return (
    <div>
      <button onClick={authHandler} className="button google-button">
        Login or Register with Google
      </button>
    </div>
  )
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [user, setUser] = React.useState(null)
  const [loadingState, setLoadingState] = React.useState('idle') // idle, loading, success, error
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleLoginState({ user })
      }
    })
  }, [user, isLoggedIn])

  function handleLoginState(userData) {
    setUser(userData.user)
    setIsLoggedIn(true)
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
      localStorage.removeItem('token')
    })
  }

  function googleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken

        console.log('credential', credential)
        console.log('google token', token)
        const { user } = result
        handleLoginState({ user })
      })
      .catch((err) => console.log('error with google login', err))
  }

  function UnAuthenticatedApp() {
    return (
      <>
        <Form formFn={login} submitButton="Login" />
        <Form formFn={register} submitButton="Register" />
        <GoogleButton authHandler={googleLogin} />
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
