import { Button, Col, Mentions, notification, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMembers, postComment } from '../actions'
import { isSpace } from '../lib'

const PARENT_TYPE = {
  DOCUMENT: "Document",
  COMMENT: "Comment",
}

class PostComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contentState: '',
    };
  }

  componentWillMount() {
    this.props.getMembers()
  }

  onButtonClicked() {
    const content = (this.state.contentState).replace(/(?=.*(?<!  \n)$)(?=\n$)/, '  \n')

    if (isSpace(content)) {
      return notification.warning({
        message: '댓글을 확인해주세요!',
        description: '업로드하고자 하는 댓글 내용이 없습니다',
        duration: 3,
      })
    }
   
    switch(this.props.parentType)
    {
      case PARENT_TYPE.DOCUMENT:
        this.props.postComment({
          documentId: this.props.feedId,
          content,
        }); break;
      case PARENT_TYPE.COMMENT:
        this.props.postComment({
          commentId: this.props.feedId,
          content,
        }); break;
    }
    
    this.setState({ contentState: '' })
  }

  onChangeInput(contentState) {
    this.setState({ contentState })
  }

  render() {
    const { account } = this.props

    return (
      <Row className="postcomment-container">
        <Col span={2}>
          <img 
            src={account.profile.profileImage} 
            alt={account.profile.profileImage} 
          />
        </Col>
        <Col span={20}>
          <Mentions
            className="postcomment-mention"
            onChange={(contentState) => this.onChangeInput(contentState)}
            placeholder="Write Comment"
            value={this.state.contentState}
            multiLines
            rows={1}
          >
            {(this.props.members).map(member => (
              <Option key={member.id} value={`${member.student.nTh}기_${member.student.name}`}>
                {`${member.student.nTh}기_${member.student.name}`}
              </Option>
            ))}
          </Mentions>
        </Col>
        <Col span={2}>
          <Button icon="enter" shape="circle" onClick={() => this.onButtonClicked()} />
        </Col>
      </Row>
    )
  }
}

PostComment.propTypes = {
  account: PropTypes.object.isRequired,
  members: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
  members: state.members,
})
const mapDispatchToProps = ({
  getMembers,
  postComment,
})
export default connect(mapStateToProps, mapDispatchToProps)(PostComment)
