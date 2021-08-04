import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import koKR from 'antd/lib/locale-provider/ko_KR'
import { postComment } from '../actions'
import { isSpace } from '../lib'
import { Button, Mention, LocaleProvider, notification } from 'antd'

const { toString, toContentState } = Mention

class PostComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentState: toContentState(''),
    };
  }

  onButtonClicked() {
    const content = toString(this.state.contentState).replace(/(?=.*(?<!  \n)$)(?=\n$)/, '  \n')
    if (isSpace(content)) {
      notification.warning({
        message: '댓글을 확인해주세요!',
        description: '업로드하고자 하는 댓글 내용이 없습니다',
        duration: 3,
      })
    }
    else {
      this.props.postComment({
        documentId: this.props.feedId,
        content,
      })
    }
    this.setState({ contentState: toContentState('') })
  }

  onChangeInput(contentState) {
    this.setState({ contentState })
  }

  render() {
    const { user } = this.props
    return (
      <LocaleProvider locale={koKR}>
        <div style={{ display: 'flex' }}>
          <div style={{
            marginRight: '4px', width: '32px', height: '32px', background: '#FFF',
          }}
          >
            <img src={user.profileImage.savedPath} alt={user.profileImage.filename} width="100%" />
          </div>
          <div style={{
            width: '94%',
            display: 'flex',
          }}
          >
            <div style={{ width: '94%', marginRight: '4px' }}>
              <Mention
                style={{ width: '100%', height: '30px' }}
                onChange={(contentState) => this.onChangeInput(contentState)}
                placeholder="Write Comment"
                value={this.state.contentState}
                multiLines
              />
            </div>
            <div>
              <Button icon="enter" shape="circle" onClick={() => this.onButtonClicked()} />
            </div>
          </div>
        </div>
      </LocaleProvider>
    )
  }
}

PostComment.propTypes = {
  postComment: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postComment,
})
export default connect(mapStateToProps, mapDispatchToProps)(PostComment)
