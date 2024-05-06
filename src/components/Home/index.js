import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  onFindJobs = () => {
    const {history} = this.props
    history.replace('/jobs')
  }

  render() {
    return (
      <div className="bg-home">
        <Header />
        <div className="bg-card">
          <div className="bg-context">
            <h1 className="bg-heading">Find The Job That Fits Your Life</h1>
            <p className="bg-para">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential
            </p>
            <button
              type="submit"
              onClick={this.onFindJobs}
              className="btn-find-jobs"
            >
              Find Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
