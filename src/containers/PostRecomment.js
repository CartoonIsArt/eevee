import React, { Component } from 'react'
import { Input } from 'antd'

class PostComment extends Component {
  render() {
    return (
      <div style={{ display: 'flex' }} >
        <div style={{ marginRight: '4px', width: '32px', height: '32px', background: '#00FF00' }} />
        <div style={{ width: '94%' }}>
          <Input
            type="textarea"
            autosize={{ minRows: 1, maxRows: 2 }}
            placeholder="Write Comment"
          />
        </div>
      </div>
    )
  }
}

export default PostComment
