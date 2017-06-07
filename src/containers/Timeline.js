import React, { Component } from 'react'
import Feed from './Feed'
import Ads from './Ads'
import Write from './Write'


class Timeline extends Component {
  render() {
    return (
      <section style={{ padding: '8px' }}>
        <Write />
        <Feed />
        <Ads />
        <Feed />
        <Ads />
        <Feed />
      </section>
    )
  }
}

export default Timeline
