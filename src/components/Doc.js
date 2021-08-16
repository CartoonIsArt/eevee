import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import Line from './Line'
import Namecard from './Namecard'
import NameTag from './NameTag'
import { printTime } from '../policy'
// import Album from './Album'
import Write from './Write'
import { getAccount, postDocumentLike, patchDocumentLike } from '../actions'
import { Button, Popover, Tag, Icon } from 'antd'

class Doc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAppend: false,
    }
    this.props.getAccount()
  }
  
  onClickLikeIt() {
    const { content } = this.props
    const { account } = this.props

    if (content.likedAccounts.findIndex((lover) => lover.id === account.id) === -1) {
      this.props.postDocumentLike(content.id)
    } else {
      this.props.patchDocumentLike(content.id)
    }
  }

  toggleAppending() {
    this.setState({ isAppend: !this.state.isAppend })
  }

  render() {
    const { isAppend } = this.state
    const { account, content } = this.props
    const { author, createdAt } = content
    const imgsrc = author.profile.profileImage
    const imgalt = author.profile.profileImage
    // const images = content.images
    
    return (
      <div style={{ background: '#fff', padding: '8px', marginBottom: '1px' }}>
        {/* <div style={{ display: 'flex', lineHeight: '16pt', marginBottom: '4px' }}>
          <h2>{content.title}</h2>
          <div style={{ flexGrow: 2 }} />
          <Button shape="circle" icon="down" size="small" />
        </div>
        <Line /> */}
        <div style={{ display: 'flex', marginTop: '4px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            marginRight: '4px',
            overflow: 'hidden',
          }}
          >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <div style={{ fontSize: '14pt' }}>
              {
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
            </div>
            <div>
              {' '}
              {printTime(createdAt)}
              {' '}
            </div>
          </div>
        </div>
        <div style={{ margin: '4px 0px' }}>
          <ReactMarkdown children={content.content} />
        </div>
        { /* <Album content={images} height="320px" /> */ }
        <div style={isAppend ? { display: 'block' } : { display: 'none' }}>
          <Write
            account={account}
            documentId={content.id}
            isAppend
            isNotification={Boolean(content.isNotification)}
          />
        </div>
        <Line />
        <div style={{ marginTop: '4px', display: 'flex' }}>
          <div style={{ marginRight: '12px' }}>
            <Popover
              content={
                content.likedAccounts.length
                  ? content.likedAccounts.map((lover, idx) => (
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
                {`좋아요 ${content.likedAccounts.length}`}
              </a>
            </Popover>
          </div>
          <div style={{ marginRight: '12px' }}>
            <Button
              style={{ marginRight: '4px' }}
              shape="circle"
              icon="edit"
              size="small"
              onClick={() => this.props.onClickComments()}
            />
            <a onClick={() => this.props.onClickComments()}>
              {`댓글 ${content.comments.length}`}
            </a>
          </div>
          {content.author.id === account.id
            && (
              <div>
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
              </div>
              )}
        </div>
      </div>
    )
  }
}

Doc.propTypes = {
  content: PropTypes.object.isRequired,
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
export default connect(mapStateToProps, mapDispatchToProps)(Doc)
