import { Button, Col, Mention, notification, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postComment } from '../actions'
import { isSpace } from '../lib'


const { toString, toContentState } = Mention

class PostRecomment extends Component {
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
        commentId: this.props.commentId,
        content,
      })
    }
    this.setState({ contentState: toContentState('') })
  }

  onChangeInput(contentState) {
    this.setState({ contentState })
  }

  render() {
    const { account } = this.props
    return (
      <Row style={{  margin: '4px 0px'}}>
        <Col span={2}>
          <img 
            src={account.profile.profileImage} 
            alt={account.profile.profileImage} 
            style={{ width:"32px", height:"32px", borderRadius:'50%' }}  
          />
        </Col>
        <Col span={20}>
          <Mention
            style={{ width: '100%', height: '30px' }}
            onChange={(contentState) => this.onChangeInput(contentState)}
            placeholder="Write Comment"
            value={this.state.contentState}
            multiLines
          />
        </Col>
        <Col span={2}>
          <Button icon="enter" shape="circle" onClick={() => this.onButtonClicked()} />
        </Col>
      </Row>
    )
  }
}

PostRecomment.propTypes = {
  account: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account
})
const mapDispatchToProps = ({
  postComment,
})
export default connect(mapStateToProps, mapDispatchToProps)(PostRecomment)
