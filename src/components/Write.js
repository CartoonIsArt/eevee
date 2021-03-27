import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { patchDocument, postDocument } from '../actions'
import { isSpace } from '../lib'
import Dropzone from 'react-dropzone'
import { Button, Mention, notification, Icon } from 'antd'

const { toContentState, toString } = Mention

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
      value: toContentState(''),
      mode: 'edit',
    }
    notification.config({
      duration: 0,
    })
  }

  notifyUnsupportedFile() {
    notification.warning({
      message: '지원되지 않는 파일입니다!',
      description: '파일 확장자가 jpg/jpeg/png인 경우에만 업로드 가능합니다',
      duration: 3,
    })
  }

  updateContent(contentState) {
    console.log(contentState)
    this.setState({
      value: contentState
    })
  }

  addImage(acceptedFiles) {
    const fileNames = acceptedFiles.map(file => `![${file.name}](/images/${file.name})`)
    let content = toString(this.state.value)

    fileNames.forEach(fileName => {
      content += `  \n${fileName}  \n`
    })
    this.setState({
      value: toContentState(content)
    })
  }

  getDisplay(mode) {
    const editModeDisplay = (
      <Dropzone
        accept={['image/jpeg', 'image/png']}
        noClick={true}
        onDropAccepted={(acceptedFiles) => this.addImage(acceptedFiles)}
        onDropRejected={() => this.notifyUnsupportedFile()}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Mention
              style={{ width: '100%', height: '100px' }}
              multiLines
              placeholder='글을 작성하거나 드래그&드랍으로 이미지를 올릴 수 있습니다.'
              value={this.state.value}
              onChange={(e) => this.updateContent(e)}
            />
          </div>
        )}
      </Dropzone>
    )
    const previewModeDisplay = () => (
      <ReactMarkdown children={toString(this.state.value)} />
    )
    if (mode === 'edit') return editModeDisplay
    if (mode === 'preview') return previewModeDisplay(this.state.value)
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
    const value = toString(this.state.value)
    if (isSpace(value)) {
      return notification.warning({
        message: '글을 확인해주세요!',
        description: '업로드하고자 하는 글 내용이 없습니다',
        duration: 3,
      })
    }
    else if (this.props.documentId > 0) {
      this.props.patchDocument({
        id: this.props.documentId,
        value,
      })
    } else {
      this.props.postDocument({ value })
    }
    this.setState({
      value: toContentState(''),
      mode: 'edit'
    })
  }

  render() {
    const { value, mode } = this.state
    const { user, isAppend } = this.props

    const display = this.getDisplay(mode, value)
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
            <Dropzone
              accept={['image/jpeg', 'image/png']}
              noDrag={true}
              onDropAccepted={(acceptedFiles) => this.addImage(acceptedFiles)}
              onDropRejected={() => this.notifyUnsupportedFile()}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Button icon="picture" shape="circle" />
                </div>
              )}
            </Dropzone>
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
