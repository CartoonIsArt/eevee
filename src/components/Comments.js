import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Comment from './Comment'
import PostComment from './PostComment'


class Comments extends Component {
  render() {
    const { feed } = this.props

    return (
      <div style={{ background: '#fff', padding: '8px', overflow: 'hidden' }}>
        {feed.comments.map(comment => <Comment key={comment.id}>{comment}</Comment>)}
        <PostComment parentType="Document" rootId={feed.id} />
      </div>
    )
  }
}

Comments.propTypes = {
  feed: PropTypes.object.isRequired,
}

export default Comments
