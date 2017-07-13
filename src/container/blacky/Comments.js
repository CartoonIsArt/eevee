import React, { Component } from 'react'
import { Icon, Popover } from 'antd'
import PropTypes from 'prop-types'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from '../../components/Line'

class Comments extends Component {
  render() {
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
        <PostComment user={user} />
      </div>
    )
  }
}

Comments.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Comments
