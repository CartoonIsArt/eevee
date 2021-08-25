import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccount } from '../actions'
import EnrollmentNonregular from '../components/EnrollmentNonregular'
import EnrollmentRegular from '../components/EnrollmentRegular'


class Enrollment extends Component {
  render() {
    return this.props.account.isActive
      ? <EnrollmentRegular />
      : <EnrollmentNonregular account={this.props.account} />
  }
}

Enrollment.propTypes = {
  account: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default connect(mapStateToProps, mapDispatchToProps)(Enrollment)
