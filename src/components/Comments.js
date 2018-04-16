import React, { Component } from 'react'
import { Icon, Popover } from 'antd'
import PropTypes from 'prop-types'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from '../components/Line'

class Comments extends Component {
  render() {
    const viewComments = this.props.viewComments
    const comments = this.props.content
    const feed = this.props.feed
    const user = this.props.user
    return (
      <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden' }} >
        <div>
          <Icon type="like" style={{ paddingRight: '4px' }} />
          <Popover
            content={
              feed.likedBy.length ?
                feed.likedBy.map(lover => (
                  <pre>
                    {`${lover.nTh}기 ${lover.fullname}`}
                  </pre>
                )) :
                <pre>
                당신이 이 글의 첫 번째 좋아요를 눌러주세요!
                </pre>
            }
            placement="rightTop"
          >
            <a> {feed.likedBy.length} </a>
          </Popover>
        </div>
        <Line />
        {comments.map(comment =>
          (<Comment
            key={comment.id}
            user={user}
            content={comment}
          />),
        )}
        <div style={{ height: '4px' }} />
        {
          viewComments &&
          <PostComment
            user={user}
            feedId={this.props.feed.id}
            onClickWriteComment={() => this.onClickWriteComment()}
          />
        }
      </div>
    )
  }
}

Comments.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Comments
