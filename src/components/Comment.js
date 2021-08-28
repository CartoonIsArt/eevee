import { Avatar, Button, Col, Comment as CommentAntd, Popover, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Namecard from './Namecard'
import NameTag from './NameTag'
import PostComment from './PostComment'
import { postCommentLike, patchCommentLike } from '../actions'
import { printTime } from '../lib'


class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewRecomment: false,
    }
  }

  onClickLikeIt() {
    const { comment, commentAuthor } = this.props

    if (comment.likedAccounts.findIndex((lover) => lover.id === commentAuthor.id) === -1) {
      this.props.postCommentLike(comment.id)
    } else {
      this.props.patchCommentLike(comment.id)
    }
  }

  toggleRecomment() {
    this.setState({ viewRecomment: !this.state.viewRecomment })
  }

  render() {
    const { viewRecomment } = this.state
    const { comment, commentAuthor } = this.props
    const imgsrc = commentAuthor.profile.profileImage
    const imgalt = commentAuthor.profile.profileImage

    const actions = [
      <span>
        <Popover
          content={
            comment.likedAccounts.length
              ? comment.likedAccounts.map((lover, idx) => (
                <pre key={idx}>
                  <NameTag account={lover} nameOnly={true} />
                </pre>
              ))
              : (
                <pre>
                  당신이 이 댓글의 첫 번째 좋아요를 눌러주세요!
                </pre>
              )
          }>
            <Button
              className="comment-like-button"
              shape="circle"
              icon="like"
              size="small"
              onClick={() => this.onClickLikeIt()}
            />
            <a
              onClick={() => this.onClickLikeIt()}
            >
              {`좋아요 ${comment.likedAccounts.length}`}
            </a>
        </Popover>
      </span>
    ]

    return (
      <Row className="comment-container">
        <Col span={21}>
          <Row>
            <CommentAntd
              actions={actions}
              author={
                <Popover
                  content={<Namecard account={commentAuthor} />}
                  placement="leftTop"
                >
                  <NameTag className="comment-nametag" account={commentAuthor} minimizeIcon={true} />
                </Popover>
              }
              avatar={
                <Avatar
                  src={imgsrc}
                  alt={imgalt}
                />
              }
              content={comment.content}
              datetime={printTime(comment.createdAt)}
            />
          </Row>
          <Row>
            {
              viewRecomment
              && (
              <PostComment
                feedId={comment.id}
                parentType={"Comment"}
              />
              )
             }
          </Row>
        </Col>
        <Col span={1}>
          <Button
            icon="down"
            shape="circle"
            size="small"
            onClick={() => this.toggleRecomment()}
          />
        </Col>
      </Row>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postCommentLike: PropTypes.func.isRequired,
  patchCommentLike: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postCommentLike,
  patchCommentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
