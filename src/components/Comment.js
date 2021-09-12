import { Avatar, Comment as AntdComment, Divider } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentFooter from './ContentFooter'
import NameTag from './NameTag'
import PostComment from './PostComment'
import { postCommentLike, patchCommentLike } from '../actions'
import { printTime } from '../lib'


class Comment extends Component {
  state = {
    visibleRecomments: false,
  }

  toggleRecomment = () => {
    this.setState({ visibleRecomments: !this.state.visibleRecomments })
  }

  render() {
    const { postCommentLike, patchCommentLike } = this.props
    const comment = this.props.children
    comment.comments = comment.comments || []

    return (
      <AntdComment
        className="comment-container"
        avatar={
          <Avatar
            alt="댓글 작성자 프로필 이미지"
            src={comment.author.profile.profileImage}
          />
        }
        author={
          <NameTag
            className="comment-nametag"
            minimizeIcon
            hasPopover
            account={comment.author}
          />
        }
        datetime={printTime(comment.createdAt)}
        content={
          <div>
            {comment.content}
            <Divider className="line footer-line" />
          </div>
        }
        actions={[
          <ContentFooter
            key={comment.id}
            content={comment}
            toggleComment={this.toggleRecomment}
            postLike={postCommentLike}
            cancelLike={patchCommentLike}
          />
        ]}
      >
        {this.state.visibleRecomments && [
          comment.comments.map(recomment => <Comment key={recomment.id} {...this.props}>{recomment}</Comment>),
          <PostComment key={comment.id} parentType="Comment" rootId={comment.id} />
        ]}
      </AntdComment>
    )
  }
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  postCommentLike,
  patchCommentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
