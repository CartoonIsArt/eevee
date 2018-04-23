import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, notification } from 'antd'
import ReactMarkdown from 'react-markdown'
import { patchDocument, postDocument } from '../actions'

class Write extends Component {
  static openNotificationWithIcon(type) {
    notification.config({
      duration: 0,
    })
    notification[type]({
      message: '마크다운 간단문법',
      description: "### 제목 ''굵은글씨'' '''기울임''' Enter2번 줄바꿈",
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      mode: 'edit',
    }
  }
  onClickMethod() {
    if (this.props.documentId > 0) {
      this.props.patchDocument(this.props.documentId, this.state.text)
    } else {
      this.props.postDocument(this.state.text)
    }
  }
  render() {
    const text = this.state.text
    const mode = this.state.mode
    const user = this.props.user
    let display = <div />
    let btn = <div />
    if (mode === 'edit') {
      display = (<Input
        type="textarea"
        autosize={{ minRows: 4 }}
        style={{ width: '100%' }}
        value={text}
        onChange={e => this.setState({ text: e.target.value })}
      />)
      btn = (<div style={{ display: 'flex' }}>
        <Button icon="question-circle" onClick={() => Write.openNotificationWithIcon('info')}>
          문법
        </Button>
        <div style={{ width: '4px' }} />
        <Button icon="edit" onClick={() => this.setState({ mode: 'preview' })}>
          글쓸거임?
        </Button>
      </div>)
    } else if (mode === 'preview') {
      display = <ReactMarkdown source={text} />
      btn = (<div style={{ display: 'flex' }}>
        <Button icon="reload" onClick={() => this.setState({ mode: 'edit' })}>
                수정
        </Button>
        <div style={{ width: '4px' }} />
        {
          // eslint-disable-next-line
          <Button icon="cloud-upload" type="primary" onClick={() => this.onClickMethod()}>
            완료
          </Button>
        }
      </div>)
    }
    return (
      <div style={{ marginBottom: '4px', padding: '4px', display: 'flex', background: '#FFF' }} >
        <div style={{ marginRight: '4px', width: '48px', height: '48px', background: '#FFF', overflow: 'hidden' }} >
          <img src={user.profileImage.savedPath} alt={user.profileImage.filename} width="100%" />
        </div>
        <div style={{ flexGrow: 1 }}>
          { display }
          <div style={{ justifyContent: 'space-between', display: 'flex', margin: '4px 0px' }} >
            <Button icon="picture" shape="circle" />
            <div>
              {btn}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postDocument,
  patchDocument,
})

export default connect(mapStateToProps, mapDispatchToProps)(Write)
