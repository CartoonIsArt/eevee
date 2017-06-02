import React, { Component } from 'react'
import Memory from './Memory'
import Ads from './Ads'
import Write from './Write'


class Timeline extends Component {
  render() {
    return (
      <section>
        <Write />
        <Memory />
        <Ads />
        <Memory />
        <Ads />
        <Memory />
      </section>
    )
  }
}

export default Timeline
