import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Recomments from './Recomments'
import Namecard from './Namecard'
import NameTag from './NameTag'
import { printTime } from '../policy'
import { postCommentLike, patchCommentLike } from '../actions'
import { Button, Popover } from 'antd'

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

    return (
      <div style={{ margin: '2px 0px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '32px', marginRight: '4px', height: '32px', background: '#fefefe',
          }}
          >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ width: '91%' }}>
            <p>
              <Popover
                content={<Namecard account={commentAuthor} />}
                placement="leftTop"
              >
                <NameTag account={commentAuthor} minimizeIcon={true} />
              </Popover>
              {comment.content}
            </p>
            <div style={{ display: 'flex' }}>
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
                }
                placement="rightTop"
              >
                <a
                  style={{ marginRight: '8px' }}
                  onClick={() => this.onClickLikeIt()}
                >
                  {`좋아요 ${comment.likedAccounts.length}`}
                </a>
              </Popover>
              {
                comment.replies
                && (
                <pre>
                  {`대댓글 ${comment.replies.length}`}
                </pre>
                )
              }
              <div style={{ color: '#0a0a0' }}>
                {printTime(comment.createdAt)}
              </div>
            </div>
            <Recomments
              commentId={comment.id}
              viewRecomment={viewRecomment}
              recomments={comment.replies ? comment.replies : []}
            />
          </div>
          <div>
            <Button
              icon="down"
              shape="circle"
              size="small"
              onClick={() => this.toggleRecomment()}
            />
          </div>
        </div>
      </div>
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
