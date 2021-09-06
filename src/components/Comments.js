import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Comment from './Comment'
import PostComment from './PostComment'


class Comments extends Component {
  render() {
    const { feed, comments } = this.props
    
    return (
      <div style={{ background: '#fff', padding: '8px', overflow: 'hidden' }}>
        {comments.map(comment => <Comment key={comment.id}>{comment}</Comment>)}
        <PostComment
          rootId={feed.id}
          parentType={"Document"}
        />
      </div>
    )
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default Comments
