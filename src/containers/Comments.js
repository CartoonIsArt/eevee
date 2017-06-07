import React, { Component } from 'react'
import { Icon } from 'antd'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from '../components/Line'

class Comments extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div style={{ background: '#efefef', display: 'flex', flexDirection: 'column', height: '396px', padding: '8px' }} >
        <div style={{ fontColor: '#FF8900' }}>
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
