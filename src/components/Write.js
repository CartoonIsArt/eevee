import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { patchDocument, postDocument } from '../actions'

const Button = require('antd/lib/button')
const Input = require('antd/lib/input')
const notification = require('antd/lib/notification')

const openNotificationWithIcon = () => {
  notification.info({
    message: '마크다운 간단문법',
    description: "### 제목 ''굵은글씨'' '''기울임''' Enter2번 줄바꿈",
  })
}

class Write extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      mode: 'edit',
    }
    notification.config({
      duration: 0,
    })
  }

  getDisplay(mode, text) {
    const editModeDisplay = (text) => (
      <Input
        type="textarea"
        autosize={{ minRows: 4 }}
        style={{ width: '100%' }}
        value={text}
        onChange={(e) => this.setState({ text: e.target.value })}
      />
    )
    const previewModeDisplay = (text) => (<ReactMarkdown source={text} />)
    if (mode === 'edit') return editModeDisplay(text)
    if (mode === 'preview') return previewModeDisplay(text)
    return <div />
  }

  changeMode(mode) {
    this.setState({ mode })
  }

  getButton(mode) {
    const editModeButton = (
      <div style={{ display: 'flex' }}>
        <Button icon="question-circle" onClick={() => openNotificationWithIcon()}>
          문법
        </Button>
        <div style={{ width: '4px' }} />
        <Button icon="edit" onClick={() => this.changeMode('preview')}>
          글쓸거임?
        </Button>
      </div>
    )
    const previewModeButton = (
      <div style={{ display: 'flex' }}>
        <Button icon="reload" onClick={() => this.changeMode('edit')}>
          수정
        </Button>
        <div style={{ width: '4px' }} />
        <Button icon="cloud-upload" type="primary" onClick={() => this.uploadDocument()}>
          완료
        </Button>
      </div>
    )
    if (mode === 'edit') return editModeButton
    if (mode === 'preview') return previewModeButton
    return <div />
  }

  uploadDocument() {
    if (this.props.documentId > 0) {
      this.props.patchDocument(this.props.documentId, this.state.text)
    } else {
      this.props.postDocument(this.state.text)
    }
    this.setState({ text: '', mode: 'edit' })
  }

  render() {
    const { text } = this.state
    const { mode } = this.state
    const { user } = this.props

    const display = this.getDisplay(mode, text)
    const button = this.getButton(mode)

    return (
      <div style={{
        marginBottom: '4px', padding: '4px', display: 'flex', background: '#FFF',
      }}
      >
        <div style={{
          marginRight: '4px', width: '48px', height: '48px', background: '#FFF', overflow: 'hidden',
        }}
        >
          <img src={user.profileImage.savedPath} alt={user.profileImage.filename} width="100%" />
        </div>
        <div style={{ flexGrow: 1 }}>
          { display }
          <div style={{ justifyContent: 'space-between', display: 'flex', margin: '4px 0px' }}>
            <Button icon="picture" shape="circle" />
            { button }
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
