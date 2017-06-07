import React, { Component } from 'react'
import { Input } from 'antd'

class PostComment extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }} >
        <div style={{ width: '32px', height: '32px', background: '#00FF00' }} />
        <div style={{ width: '94%' }}>
          <Input placeholder="Write Comment" />
        </div>
      </div>
    )
  }
}

export default PostComment
