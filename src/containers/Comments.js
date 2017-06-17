import React, { Component } from 'react'
import { Icon } from 'antd'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from '../components/Line'

class Comments extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden' }} >
        <div>
          <Icon type="like" />
          3
        </div>
        <Line />
        {iter.map(i =>
          <Comment key={i} />,
        )}
        <PostComment />
      </div>
    )
  }
}

export default Comments
