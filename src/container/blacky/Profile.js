import React, { Component } from 'react'
import Activity from './Activity'
import Namecard from './Namecard'

class Profile extends Component {
  render() {
    return (
      <div style={{ height: '516px', outline: 'solid black 1px', background: '#FFFFFF' }}>
        <Namecard />
        <Activity />
      </div>
    )
  }
}

export default Profile
