import { Button, Col, Mentions, notification, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postComment } from '../actions'
import { isSpace } from '../lib'

const PARENT_TYPE = {
  DOCUMENT: "Document",
  COMMENT: "Comment",
}

class PostComment extends Component {
  state = {
    value: '',
  };

  onButtonClicked = () => {
    const content = this.state.value.replace(/(?=.*(?<!  \n)$)(?=\n$)/, '  \n')

    if (isSpace(content)) {
      return notification.warning({
        message: '댓글을 확인해주세요!',
        description: '업로드하고자 하는 댓글 내용이 없습니다',
        duration: 3,
      })
    }

    const rootId = (this.props.parentType == PARENT_TYPE.DOCUMENT)
      ? "documentId"
      : "commentId"

    this.props.postComment({
      [rootId]: this.props.rootId,
      content,
    })
    this.setState({ value: '' })
  }

  onChangeInput = (value) => {
    this.setState({ value })
  }

  render() {
    const { account } = this.props

    return (
      <Row id="post-comment-container">
        <Col span={2}>
          <img
            alt="댓글 작성자"
            src={account.profile.profileImage}
          />
        </Col>
        <Col span={20}>
          <Mentions
            id="post-comment-mention"
            placeholder="예쁜 댓글을 작성해보세요!"
            onChange={this.onChangeInput}
            value={this.state.value}
          />
        </Col>
        <Col span={2}>
          <Button
            id="post-comment-button"
            icon="enter"
            shape="circle"
            onClick={this.onButtonClicked}
          />
        </Col>
      </Row>
    )
  }
}

PostComment.propTypes = {
  parentType: PropTypes.oneOf(['Document', 'Comment']),
  rootId: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  postComment,
})
export default connect(mapStateToProps, mapDispatchToProps)(PostComment)
