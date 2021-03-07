import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from './Line'

const Icon = require('antd/lib/icon')
const Popover = require('antd/lib/popover')

class Comments extends Component {
  render() {
    const comments = this.props.content
    const { feed } = this.props
    const { user } = this.props
    return (
      <div style={{
        background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden',
      }}
      >
        <div>
          <Icon type="like" style={{ paddingRight: '4px' }} />
          <Popover
            content={
              feed.likedUsers.length
                ? feed.likedUsers.map((lover, idx) => (
                  <pre key={idx}>
                  {`${lover.nTh}기 ${lover.fullname}`}
                  </pre>
                ))
                : (
                  <pre>
                    당신이 이 글의 첫 번째 좋아요를 눌러주세요!
                  </pre>
                )
            }
            placement="rightTop"
          >
            <a> {` ${feed.likedUsers.length} `} </a>
          </Popover>
        </div>
        <Line />
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
