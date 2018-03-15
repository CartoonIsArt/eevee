import React, { Component } from 'react'
import { Input, Button } from 'antd'
import { request } from '../fetches/request'

const args = [];

class PostComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
    };
  }
  onButtonClicked() {
    args.push({ type: 'String', key: 'documentId', value: this.props.feedId })
    args.push({ type: 'String', key: 'text', value: this.state.text })

    request('POST', 'comments', args)
  }
  onChangeInput(e) {
    this.setState(e);
  }
  render() {
    const user = this.props.user
    const text = this.state.text
    return (
      <div style={{ display: 'flex' }} >
        <div style={{ marginRight: '4px', width: '32px', height: '32px', background: '#FFF' }} >
          <img src={user.image.src} alt={user.image.alt} width="100%" />
        </div>
        <div style={{
          width: '94%',
          display: 'flex',
        }}
        >
          <div style={{ width: '94%', marginRight: '4px' }}>
            <Input
              type="textarea"
              autosize={{ minRows: 1 }}
              onChange={e => this.onChangeInput({ text: e.target.value })}
              placeholder="Write Comment"
              value={text}
            />
          </div>
          <div>
            <Button icon="enter" shape="circle" onClick={() => this.onButtonClicked()} />
          </div>
        </div>
      </div>
    )
  }
}

export default PostComment
