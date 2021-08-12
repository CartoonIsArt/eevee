import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Recomments from './Recomments'
import Namecard from './Namecard'
import { printTime } from '../policy'
import { postCommentLike, patchCommentLike } from '../actions'
import { Button, Popover, Tag, Icon } from 'antd'

class Comment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewRecomment: false,
    }
  }
  
  makeAccountBadge(account) {
    if (account.role === "superuser") return (<Tag color="tomato"><Icon type="user" /></Tag>)
    if (account.role === "board manager") return (<Tag color="yellowgreen"><Icon type="form" /></Tag>)
    if (account.role === "manager") return (<Tag color="goldenrod"><Icon type="dollar" /></Tag>)
    return (<span />)
  }

  onClickLikeIt() {
    const comment = this.props.content
    const { account } = this.props

    if (comment.likedAccounts.findIndex((lover) => lover.id === account.id) === -1) {
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
    const comment = this.props.content
    const { account } = this.props
    const { author } = comment
    const nickname = `${author.student.nTh}기 ${author.student.name}`
    const imgsrc = author.profile.profileImage
    const imgalt = author.profile.profileImage

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
                <Link to={`/members/${author.student.username}`}>
                  <span> {nickname} {this.makeAccountBadge(author)} </span>
                </Link>
              </Popover>
              {comment.content}
            </p>
            <div style={{ display: 'flex' }}>
              <Popover
                content={
                  comment.likedAccounts.length
                    ? comment.likedAccounts.map((lover) => (
                      <pre>
                        <span>{`${lover.student.nTh}기 ${lover.student.name}`} {this.makeAccountBadge(lover)}</span>
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
              account={account}
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
  patchCommentLike: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postCommentLike,
  patchCommentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
