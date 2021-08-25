import { Avatar, Button, Col, Comment as CommentAntd, Icon, Popover, Row, Tooltip  } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Namecard from './Namecard'
import NameTag from './NameTag'
import Recomments from './Recomments'
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
        <Tooltip 
          title={
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
            <Icon
              type="like"
              onClick={() => this.onClickLikeIt()}
            />
            <a
              style={{ marginRight: '8px' }}
              onClick={() => this.onClickLikeIt()}
            >
              {`좋아요 ${comment.likedAccounts.length}`}
            </a>
        </Tooltip>
      </span>
    ]

    return (
      <Row style={{ margin: '4px 0px' }}>
        <Col span={21}>
          {/* <Row> */}
          <CommentAntd
            className='comment'
            actions={actions}
            author={
              <Popover
                content={<Namecard account={commentAuthor} />}
                placement="leftTop"
              >
                <NameTag style={{ fontSize:"12pt", color: "#4492ff" }} account={commentAuthor} minimizeIcon={true} />
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
          {/* </Row> */}
          <Recomments
            commentId={comment.id}
            viewRecomment={viewRecomment}
            recomments={comment.replies ? comment.replies : []}
          />
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
