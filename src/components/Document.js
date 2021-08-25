import { Avatar, Button, Card, Col, Popover, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { connect } from 'react-redux'
import Line from './Line'
import Namecard from './Namecard'
import NameTag from './NameTag'
import Write from './Write'
import { getAccount, postDocumentLike, patchDocumentLike } from '../actions'
import { printTime } from '../lib'


class Document extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAppend: false,
    }
    this.props.getAccount()
  }
  
  onClickLikeIt() {
    const { feed, account } = this.props

    if (feed.likedAccounts.findIndex((lover) => lover.id === account.id) === -1) {
      this.props.postDocumentLike(feed.id)
    } else {
      this.props.patchDocumentLike(feed.id)
    }
  }

  toggleAppending() {
    this.setState({ isAppend: !this.state.isAppend })
  }

  render() {
    const { isAppend } = this.state
    const { account, feed } = this.props
    const { author, createdAt } = feed
    const imgsrc = author.profile.profileImage
    const imgalt = author.profile.profileImage

    const { Meta } = Card;
    
    return (
      <div style={{ background: '#fff', padding: '8px', marginBottom: '1px' }}>
        <Row style={{ marginTop: '4px' }}>
          <Meta
            avatar={<Avatar style={{ width: '48px', height: '48px', }} src={imgsrc} alt={imgalt}/>}
            title={
              author.student.nTh
                ? (
                  <Popover
                    placement="leftTop"
                    content={<Namecard account={author} />}
                  >
                    <NameTag account={author} />
                  </Popover>
                )
                : <div> 탈퇴한 회원 </div>
            }
            description={printTime(createdAt)}
          />
        </Row>
        <Row style={{ margin: '4px 0px' }}>
          <ReactMarkdown className="reactMarkDown" children={feed.content} />
        </Row>
        { /* <Album content={images} height="320px" /> */ }
        <Row style={isAppend ? { display: 'block' } : { display: 'none' }}>
          <Write
            documentId={feed.id}
            isAppend
            isNotification={Boolean(feed.isNotification)}
          />
        </Row>
        <Line />
        <Row style={{ marginTop: '4px', display: 'flex' }}>
          <Col style={{ marginRight: '12px' }}>
            <Popover
              content={
                feed.likedAccounts.length
                  ? feed.likedAccounts.map((lover, idx) => (
                    <pre key={idx}>
                      <NameTag account={lover} nameOnly={true} />
                    </pre>
                  ))
                  : (<pre>당신이 이 글의 첫 번째 좋아요를 눌러주세요!</pre>)
                }
              placement="rightTop"
            >
              <Button
                style={{ marginRight: '4px' }}
                shape="circle"
                icon="like"
                size="small"
                onClick={() => this.onClickLikeIt()}
              />
              <a onClick={() => this.onClickLikeIt()}>
                {`좋아요 ${feed.likedAccounts.length}`}
              </a>
            </Popover>
          </Col>
          <Col style={{ marginRight: '12px' }}>
            <Button
              style={{ marginRight: '4px' }}
              shape="circle"
              icon="edit"
              size="small"
              onClick={() => this.props.onClickComments()}
            />
            <a onClick={() => this.props.onClickComments()}>
              {`댓글 ${feed.comments.length}`}
            </a>
          </Col>
          {feed.author.id === account.id
            && (
              <Col>
                <Button
                  style={{ marginRight: '4px' }}
                  shape="circle"
                  icon="plus"
                  size="small"
                  onClick={() => this.toggleAppending()}
                />
                <a onClick={() => this.toggleAppending()}>
                  이어쓰기
                </a>
              </Col>
              )}
        </Row>
      </div>
    )
  }
}

Document.propTypes = {
  feed: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  postDocumentLike: PropTypes.func.isRequired,
  patchDocumentLike: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
  postDocumentLike,
  patchDocumentLike: patchDocumentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Document)
