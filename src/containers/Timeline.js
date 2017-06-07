import React, { Component } from 'react'
import Feed from './Feed'
import Ads from './Ads'
import Write from './Write'


class Timeline extends Component {
  render() {
    return (
      <section>
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
