import React, { Component } from 'react'
import { Icon, Popover } from 'antd'
import PropTypes from 'prop-types'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from '../components/Line'
import { request } from '../fetches/request'

class Comments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
    };
  }
  onClickWriteComment() {
    request('GET', `documents/${this.props.feed.id}`, [])
    .then((res) => {
      this.props.content = res.data.comments
      this.setState({
        response: res,
      })
    })
    .catch((err) => {
      this.setState({
        response: err.response,
      })
    })
  }
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
              feed.likedBy.map(lover => (
                <pre>
                  {`${lover.nTh}기 ${lover.fullname}`}
                </pre>
              ))
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
