import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import koKR from 'antd/lib/locale-provider/ko_KR'
import { postComment } from '../actions'

const Mention = require('antd/lib/mention')
const Button = require('antd/lib/button')
const LocaleProvider = require('antd/lib/locale-provider')

class PostComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
    };
  }

  onButtonClicked() {
    this.props.postComment({
      documentId: this.props.feedId,
      content: this.state.content,
    })
    this.setState({ content: '' })
  }

  onChangeInput(editorState) {
    const { toString } = Mention
    const content = toString(editorState).replace(/(?=.*(?<!  \n)$)(?=\n$)/, '  \n')
    this.setState({ content })
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
                onChange={(editorState) => this.onChangeInput(editorState)}
                placeholder="Write Comment"
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
