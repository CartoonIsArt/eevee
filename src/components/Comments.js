import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import PostComment from './PostComment'

class Comments extends Component {
  render() {
    const comments = this.props.content
    const { user } = this.props
    return (
      <div style={{
        background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden',
      }}
      >
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            user={user}
            content={comment}
          />
        ))}
        <div style={{ height: '4px' }} />
        <PostComment
          user={user}
          feedId={this.props.feed.id}
        />
      </div>
    )
  }
}

Comments.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Comments
