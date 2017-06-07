import React, { Component } from 'react'
import Doc from './Doc'
import Comments from './Comments'

class Feed extends Component {
  render() {
    return (
      <article style={{ background: '#FFF', height: '1036px' }}>
        <Doc />
        <Comments />
      </article>
    )
  }
}

export default Feed
