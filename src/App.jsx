import './App.css'

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
  function login(formData) {
    console.log('Login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }

  function logout() {}

  return (
    <div className="App">
      <div className="header">
        <h1>Bindaas Tomal App</h1>
        <p>Hello Tamal</p>
        <button className="button" type="button">
          Logout
        </button>
      </div>
      <main className="content">
        <h3>Login</h3>
        <Form formFn={login} submitButton="Login" />
        <h3>Register</h3>
        <Form formFn={register} submitButton="Register" />
      </main>
    </div>
  )
}

export default App
