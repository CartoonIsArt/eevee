import { Card } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccount } from '../actions'
import Activity from './Activity'
import Namecard from './Namecard'


class Profile extends Component {
  render() {
    const { account } = this.props
    return (
      <Card size="small">
        <Namecard account={account} size="100%" />
        <Activity content={account} />
      </Card>
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
