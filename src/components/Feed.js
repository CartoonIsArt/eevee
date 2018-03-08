import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Doc from './Doc'
import Comments from './Comments'

class Feed extends Component {
  render() {
    const content = this.props.content
    const comments = content.comments
    const user = this.props.user
    return (
      <article style={{ marginBottom: '4px' }}>
        <Doc
          user={user}
          content={this.props.content}
        />
        <Comments
          user={user.user}
          content={comments}
          feed={content}
        />
      </article>
    )
  }
}

Feed.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Feed
