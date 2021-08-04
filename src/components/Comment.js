import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Recomments from './Recomments'
import Namecard from './Namecard'
import { printTime } from '../policy'
import { postCommentLike, deleteCommentLike } from '../actions'
import { Button, Popover, Tag, Icon } from 'antd'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewRecomment: false,
    }
  }
  
  makeUserBadge(user) {
    if (user.isSuperuser) return (<Tag color="tomato"><Icon type="user" /> 관리자</Tag>)
    if (user.isBoardMember) return (<Tag color="yellowgreen"><Icon type="form" /> 임원진</Tag>)
    if (user.isManager) return (<Tag color="goldenrod"><Icon type="dollar" /> 총무</Tag>)
    return (<div />)
  }

  onClickLikeIt() {
    const comment = this.props.content
    const { user } = this.props

    if (comment.likedUsers.findIndex((lover) => lover.id === user.id) === -1) {
      this.props.postCommentLike(comment.id)
    } else {
      this.props.deleteCommentLike(comment.id)
    }
  }

  toggleRecomment() {
    this.setState({ viewRecomment: !this.state.viewRecomment })
  }

  makeUserBadge(user) {
    if (user.isSuperuser) return (<Tag color="tomato"><Icon type="user" /></Tag>)
    if (user.isBoardMember) return (<Tag color="yellowgreen"><Icon type="form" /></Tag>)
    if (user.isManager) return (<Tag color="goldenrod"><Icon type="dollar" /></Tag>)
    return (<div />)
  }

  render() {
    const { viewRecomment } = this.state
    const comment = this.props.content
    const { user } = this.props
    const { author } = comment
    const nickname = `${author.nTh}기 ${author.fullname}`
    const imgsrc = author.profileImage.savedPath
    const imgalt = author.profileImage.filename

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
                content={<Namecard content={author} />}
                placement="leftTop"
              >
                <Link to={`/members/${author.username}`}>
                  <span> {nickname} {this.makeUserBadge(author)} </span>
                </Link>
              </Popover>
              {comment.content}
            </p>
            <div style={{ display: 'flex' }}>
              <Popover
                content={
                  comment.likedUsers.length
                    ? comment.likedUsers.map((lover) => (
                      <pre>
                        <span>{`${lover.nTh}기 ${lover.fullname}`} {this.makeUserBadge(lover)}</span>
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
                  {`좋아요 ${comment.likedUsers.length}`}
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
              user={user}
              viewRecomment={viewRecomment}
              content={comment.replies ? comment.replies : []}
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
  content: PropTypes.object.isRequired,
  postCommentLike: PropTypes.func.isRequired,
  deleteCommentLike: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postCommentLike,
  deleteCommentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
