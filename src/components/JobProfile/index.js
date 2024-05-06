import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class JobProfile extends Component {
  state = {
    isProfileLoading: true,
    isRetry: false,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const formatData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        isProfileLoading: false,
        details: formatData,
      })
    } else this.setState({isRetry: true, isProfileLoading: false})
  }

  renderProfile = () => {
    const {details} = this.state
    const {profileImageUrl, name, shortBio} = details
    return (
      <div className="bg-profile">
        <img src={profileImageUrl} alt="icon" />
        <h2>{name}</h2>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderRetry = () => (
    <div className="bg-retry-card">
      <button
        type="submit"
        onClick={this.getProfileDetails}
        className="btn-retry"
      >
        RETRY
      </button>
    </div>
  )

  profile = () => {
    const {isRetry} = this.state
    return isRetry ? this.renderRetry() : this.renderProfile()
  }

  render() {
    const {isProfileLoading} = this.state
    return (
      <div className="bg-profile-container">
        {isProfileLoading ? (
          <div data-testid="loader" className="bg-profile-loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          this.profile()
        )}
      </div>
    )
  }
}

export default JobProfile
