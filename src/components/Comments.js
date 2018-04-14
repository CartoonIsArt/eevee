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
    const user = this.props.user
    return (
      <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden' }} >
        <div>
          <Icon type="like" style={{ paddingRight: '4px' }} />
          <Popover
            content={
              <pre>
                  17기 찹쌀밥{'\n'}
                  18기 순두부{'\n'}
                  16기 닭죽{'\n'}
                  19기 바보곰{'\n'}
              </pre>
              }
            placement="rightTop"
          >
            <a> 3 </a>
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
