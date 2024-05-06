import {Link, withRouter} from 'react-router-dom'
import './index.css'
import Cookies from 'js-cookie'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="bg-header">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="bg-logo"
        />
      </div>
      <div className="bg-links">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/jobs" className="link">
          Jobs
        </Link>
      </div>
      <button type="submit" onClick={onLogout} className="btn-logout">
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
