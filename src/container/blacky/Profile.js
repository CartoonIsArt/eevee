import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Activity from './Activity'
import Namecard from './Namecard'
import { getUser } from '../../actions'


class Profile extends Component {
  componentWillMount() {
    const user = this.props.user
    if (user.user === undefined) { this.props.getUser() }
  }
  render() {
    const user = this.props.user
    return (
      <div style={{ height: '516px', background: '#FFFFFF', marginTop: '8px' }}>
        {user.has_logged_in &&
        <div>
          <Namecard content={user.user} />
          <Activity content={user.user} />
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
