import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  onChangeUsername = e => this.setState({username: e.target.value})

  onChangePassword = e => this.setState({password: e.target.value})

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userInfo = {username, password}
    const userData = JSON.stringify(userInfo)

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: userData,
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    }
  }

  onLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  render() {
    const {username, password} = this.state
    console.log(username)
    console.log(password)

    const token = Cookies.get('jwt_token')
    console.log(token)

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="bg-container">
        <div className="bg-login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="bg-logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <div className="bg-form">
              <div>
                <label htmlFor="username" className="bg-input-label">
                  USERNAME
                </label>
                <br />
                <input
                  type="text"
                  id="username"
                  className="bg-input"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div>
                <label htmlFor="password" className="bg-input-label">
                  PASSWORD
                </label>
                <br />
                <input
                  type="password"
                  id="password"
                  className="bg-input"
                  onChange={this.onChangePassword}
                />
              </div>
              <button
                type="submit"
                className="btn-login"
                onClick={this.onLoginBtn}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
