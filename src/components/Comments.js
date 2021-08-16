import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import PostComment from './PostComment'

class Comments extends Component {
  render() {
    const comments = this.props.content
    const { account } = this.props
    return (
      <div style={{
        background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden',
      }}
      >
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            account={account}
            content={comment}
          />
        ))}
        <div style={{ height: '4px' }} />
        <PostComment
          account={this.props.session} // 변수명 변경 (Comment 컴포넌트와 함께 해야함)
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
