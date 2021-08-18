import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { postPhotos, postDocument, patchDocument } from '../actions'
import { isSpace } from '../lib'
import Dropzone from 'react-dropzone'
import { Button, Mention, notification, Checkbox, Row, Col } from 'antd'

const { toContentState, toString } = Mention

const getColor = (props) => {
  if (props.isDragAccept) return '#00e676'
  if (props.isDragReject) return '#ff1744'
  if (props.isDragActive) return '#2196f3'
  return '#eeeeee'
}

const openNotificationWithIcon = () => {
  notification.info({
    message: '마크다운 간단문법',
    description: "### 제목 ''굵은글씨'' '''기울임''' Enter2번 줄바꿈",
  })
}

function isManager(account) {
  if (account.role === "superuser")     return true
  if (account.role === "board manager") return true
  if (account.role === "manager")       return true
  return false
}

class Write extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: toContentState(''),
      isNotification: this.props.isNotification || false,
      fileList: [],
      mode: 'edit',
    }
    notification.config({
      duration: 0,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.photos !== prevProps.photos) {
      const fileNames = this.props.photos.map(fileName => `![${fileName}](/images/${fileName})`)
      let content = toString(this.state.value)
  
      fileNames.forEach(fileName => {
        content += `  \n${fileName}  \n`
      })
      this.setState({
        value: toContentState(content),
        fileList: [...this.state.fileList, ...this.props.photos]
      })
    }
  }

  notifyUnsupportedFile() {
    notification.warning({
      message: '지원되지 않는 파일입니다!',
      description: '파일 확장자가 jpg/jpeg/png인 경우에만 업로드 가능합니다',
      duration: 3,
    })
  }

  updateValue(contentState) {
    this.setState({
      value: contentState
    })
  }

  addImage(acceptedFiles) {
    this.props.postPhotos(acceptedFiles)
      .catch((e) => {
        notification.warning({
          message: e.message,
          description: e.unsafes.join('\n'),
          duration: 5,
        })
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
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
          <div
            {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
          >
            <input {...getInputProps()} />
            <Mention
              style={{ width: '100%', height: '100px', borderColor: getColor({ isDragActive, isDragAccept, isDragReject }) }}
              multiLines
              placeholder='글을 작성하거나 드래그&드랍으로 이미지를 올릴 수 있습니다.'
              value={this.state.value}
              onChange={(e) => this.updateValue(e)}
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
      <div style={{ display: 'flex', float: 'right' }}>
        <Button
          style={{ marginRight: '4px' }}
          icon="question-circle"
          onClick={() => openNotificationWithIcon()}>
            문법
        </Button>
        <Button icon="edit" onClick={() => this.changeMode('preview')}>
          글쓸거임?
        </Button>
      </div>
    )
    const previewModeButton = (
      <div style={{ display: 'flex', float: 'right' }}>
        <Button
          style={{ marginRight: '4px' }}
          icon="reload"
          onClick={() => this.changeMode('edit')}>
            수정
        </Button>
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
    const content = toString(this.state.value)
    if (isSpace(content) && (this.props.isNotification === this.state.isNotification)) {
      return notification.warning({
        message: '글을 확인해주세요!',
        description: '업로드하고자 하는 글 내용이 없습니다',
        duration: 3,
      })
    }

    const formData = {
      id: this.props.documentId,
      content,
      isNotification: this.state.isNotification,
    }

    if (this.props.documentId > 0) {
      this.props.patchDocument(formData)
    }
    else {
      this.props.postDocument(formData)
    }
    this.setState({
      value: toContentState(''),
      fileList: [],
      mode: 'edit',
    })
  }

  toggleSetNotification(e) {
    this.setState({
      isNotification: e.target.checked
    })
  }

  render() {
    const { value, mode } = this.state
    const { account, isAppend } = this.props

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
              <img src={account.profile.profileImage} alt={account.profile.profileImage} width="100%" />
            </div>
          )
        }
        <div style={{ flexGrow: 1 }}>
          { display }
          <Row style={{ justifyContent: 'space-between', display: 'flex', margin: '4px 0px' }}>
            <Col span={2}>
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
            </Col>
            <Col span={13}>
            { isManager(account)
              && (<Checkbox
                    style={{ marginTop: '4px' }}
                    checked={this.state.isNotification}
                    onChange={(e) => this.toggleSetNotification(e)}>
                      공지사항으로 설정
                  </Checkbox>) }
            </Col>
            <Col span={8}>
            { button }
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

Write.propTypes = {
  account: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  photos: state.photos,
  account: state.account,
})
const mapDispatchToProps = ({
  postPhotos,
  postDocument,
  patchDocument,
})

export default connect(mapStateToProps, mapDispatchToProps)(Write)
