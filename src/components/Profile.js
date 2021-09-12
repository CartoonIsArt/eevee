import { Card } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
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
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
