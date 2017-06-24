import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Doc from './Doc'
import Comments from './Comments'

class Feed extends Component {
  render() {
    const content = this.props.content
    const comments = content.comments
    return (
      <article style={{ marginBottom: '4px' }}>
        <Doc
          content={this.props.content}
        />
        <Comments
          content={comments}
        />
      </article>
    )
  }
}

Feed.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Feed
