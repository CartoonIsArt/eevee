import React, { Component } from 'react'
import { Input, Button, Modal } from 'antd'
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
    .then((r) => {
      this.setState({
        responses: r,
      })
      console.log(this.state.responses);
    })
    .catch((e) => {
      this.setState({
        responses: e.response,
      })
      Modal.warning({ title: '오류.', content: '댓글을 올리지 못 했습니다.' })
    })
    if (this.responses.status === 200) {
      Modal.success({
        title: '댓글 작성이 완료되었습니다!',
        content: '당신의 댓글을 이제 모두가 볼 수 있습니다!',
        onOk() { location.href = '/login' },
      });
    }
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
