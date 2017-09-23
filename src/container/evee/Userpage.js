import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class Userpage extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }}>
      USERPAGE
      {this.props.match.params.username}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
