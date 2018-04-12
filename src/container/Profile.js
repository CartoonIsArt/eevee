import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Namecard from '../components/Namecard'
import Activity from '../components/Activity'
import { getUser } from '../actions'


class Profile extends Component {
  componentWillMount() {
    this.props.getUser()
  }
  render() {
    const user = this.props.user
    console.log(user)
    return (
      <div style={{ background: '#FFFFFF' }}>
        {user.has_logged_in && // 불필요
          <div>
            <Namecard content={user} />
            <Activity content={user} />
          </div>
        }
      </div>
    )
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
