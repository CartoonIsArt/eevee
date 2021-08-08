import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Namecard from '../components/Namecard'
import Activity from '../components/Activity'
import { getAccount } from '../actions'

class Profile extends Component {
  render() {
    const { account } = this.props
    return (
      <div style={{ background: '#FFFFFF' }}>
        {account.has_logged_in
          ? (
            <div>
              <Namecard content={account} />
              <Activity content={account} />
            </div>
          )
          : this.props.getAccount()}
      </div>
    )
  }
}

Profile.propTypes = {
  account: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
