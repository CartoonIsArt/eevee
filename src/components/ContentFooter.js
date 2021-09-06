import { Button, Col, Popover, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import NameTag from './NameTag'
import PostComment from './PostComment'
import { postCommentLike, patchCommentLike } from '../actions'


function showLikedAccounts(likedAccounts) {
  return likedAccounts.length
    ? likedAccounts.map((lover, idx) => <NameTag key={idx} nameOnly account={lover} />)
    : <span>당신이 이 댓글의 첫 번째 좋아요를 눌러주세요!</span>
}

const FooterButton = ({ icon, text, onClick }) => {
  return [
    <Button
      key="icon"
      className="comment-like-button"
      shape="circle"
      icon={icon}
      size="small"
      onClick={onClick}
    />,
    <Button key="text" type="link" size="small" onClick={onClick}>
      {text}
    </Button>
  ]
}

class ContentFooter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewRecomment: false,
    }
  }

  onClickLikeIt = () => {
    const { comment, commentAuthor } = this.props

    if (comment.likedAccounts.findIndex((lover) => lover.id === commentAuthor.id) === -1) {
      this.props.postCommentLike(comment.id)
    } else {
      this.props.patchCommentLike(comment.id)
    }
  }

  toggleRecomment = () => {
    this.setState({ viewRecomment: !this.state.viewRecomment })
  }

  render() {
    const { viewRecomment } = this.state
    const { content } = this.props

    return (
      <Row>
        <Col span={24}>
          <Popover content={showLikedAccounts(content.likedAccounts)}>
            <FooterButton
              icon="like"
              text={`좋아요 ${content.likedAccounts.length}`}
              onClick={this.onClickLikeIt}
            />
          </Popover>
          <FooterButton
            icon="edit"
            text={`댓글 ${content.comments.length}`}
            onClick={this.toggleRecomment}
          />
        </Col>
        <Col span={24}>
          {viewRecomment && (
            <PostComment
              feedId={content.id}
              parentType={"Comment"}
            />
            )
          }
        </Col>
      </Row>
    )
  }
}

ContentFooter.propTypes = {
  content: PropTypes.object.isRequired,
  postCommentLike: PropTypes.func.isRequired,
  patchCommentLike: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postCommentLike,
  patchCommentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(ContentFooter)
