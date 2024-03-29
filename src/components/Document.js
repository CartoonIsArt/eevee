import { Avatar, Card, Divider, message, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import ContentFooter from './ContentFooter'
import NameTag from './NameTag'
import Write from './Write'
import { postDocumentLike, patchDocumentLike } from '../actions'
import { printTime } from '../lib'
import remarkEmbed from '../lib/remark-embed'


const { Meta } = Card

class Document extends Component {
  state = {
    isAppend: false,
  }
  
  toggleAppend = () => {
    this.setState({ isAppend: !this.state.isAppend })
  }

  render() {
    const { isAppend } = this.state
    const { account, feed, toggleComment } = this.props
    const { author, createdAt } = feed
    
    return (
      <div className="document-container" size="small">
        <Row className="document-card-container">
          <Meta
            avatar={
              <Avatar
                className="document-profile-img"
                alt="글 작성자 프로필 이미지"
                src={author.profile.profileImage}
              />
            }
            title={author.student.nTh
              ? <NameTag hasPopover account={author} />
              : <span>탈퇴한 회원</span>
            }
            description={printTime(createdAt)}
          />
        </Row>
        <Row className="document-content-container">
          <ReactMarkdown
            className="reactMarkDown"
            children={feed.content}
            remarkPlugins={[remarkEmbed]}
          />
        </Row>
        <Row style={isAppend ? { display: 'block' } : { display: 'none' }}>
          <Write
            documentId={feed.id}
            isAppend
            isNotification={Boolean(feed.isNotification)}
          />
        </Row>
        <Divider className="line footer-line" />
        <ContentFooter
          key={feed.id}
          content={feed}
          toggleComment={toggleComment}
          visibleAppend={feed.author.id === account.id}
          toggleAppend={this.toggleAppend}
          postLike={this.props.postDocumentLike}
          cancelLike={this.props.patchDocumentLike}
        />
      </div>
    )
  }
}

Document.propTypes = {
  feed: PropTypes.object.isRequired,
  toggleComment: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  account: state.account,
  timeline: state.timeline,     // timeline을 state로 지정하지 않으면 timeline과 single feed에서 글 이어쓰기시 업데이트가 안됨
})
const mapDispatchToProps = ({
  postDocumentLike,
  patchDocumentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Document)
