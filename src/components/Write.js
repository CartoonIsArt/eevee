import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { patchDocument, postDocument } from '../actions'
import { isSpace } from '../lib'

const Button = require('antd/lib/button')
const Mention = require('antd/lib/mention')
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
      content: '',
      mode: 'edit',
    }
    notification.config({
      duration: 0,
    })
  }

  onEditorChange(contentState) {
    const { toString } = Mention
    const content = toString(contentState).replace(/(?=.*(?<!  \n)$)(?=\n$)/, '  \n')
    this.setState({ content })
  }

  getDisplay(mode, content) {
    const editModeDisplay = (
      <Mention
        style={{ width: '100%', height: '100px' }}
        onChange={(contentState) => this.onEditorChange(contentState)}
        multiLines
      />
    )
    const previewModeDisplay = (content) => (<ReactMarkdown source={content} />)
    if (mode === 'edit') return editModeDisplay
    if (mode === 'preview') return previewModeDisplay(content)
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
    if (isSpace(this.state.content)) {
      return notification.warning({
        message: '글을 확인해주세요!',
        description: '업로드하고자 하는 글 내용이 없습니다',
        duration: 3,
      })
    }
    else if (this.props.documentId > 0) {
      this.props.patchDocument({
        id: this.props.documentId,
        content: this.state.content
      })
    } else {
      this.props.postDocument({ content: this.state.content })
    }
    this.setState({ content: '', mode: 'edit' })
  }

  render() {
    const { content } = this.state
    const { mode } = this.state
    const { user, isAppend } = this.props

    const display = this.getDisplay(mode, content)
    const button = this.getButton(mode)

    return (
      <div style={{
        marginBottom: '4px', padding: '4px', display: 'flex', background: '#FFF',
      }}
      >
        {
          isAppend
          || (
            <div style={{
              marginRight: '4px', width: '48px', height: '48px', background: '#FFF', overflow: 'hidden',
            }}
            >
              <img src={user.profileImage.savedPath} alt={user.profileImage.filename} width="100%" />
            </div>
          )
        }
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
