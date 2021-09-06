import { Avatar, Comment as AntdComment } from 'antd'
import React, { Component } from 'react'
import ContentFooter from './ContentFooter'
import NameTag from './NameTag'
import { printTime } from '../lib'


class Comment extends Component {
  render() {
    const comment = this.props.children

    return (
      <AntdComment
        className="comment-container"
        avatar={
          <Avatar
            alt="댓글 작성자"
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
        content={comment.content}
        actions={[
          <ContentFooter
            key={comment.id}
            content={comment}
          />
        ]}
      />
    )
  }
}

export default Comment
