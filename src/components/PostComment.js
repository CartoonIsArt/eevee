import React, { Component } from 'react'
import { Input } from 'antd'

class PostComment extends Component {
  render() {
    const user = this.props.user
    return (
      <div style={{ display: 'flex' }} >
        <div style={{ marginRight: '4px', width: '32px', height: '32px', background: '#FFF' }} >
          <img src={user.image.src} alt={user.image.alt} width="100%" />
        </div>
        <div style={{ width: '94%' }}>
          <Input
            type="textarea"
            autosize={{ minRows: 1 }}
            placeholder="Write Comment"
          />
        </div>
      </div>
    )
  }
}

export default PostComment
