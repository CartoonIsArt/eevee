import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Line from './Line'
import Namecard from './Namecard'
import { printTime } from '../policy'
// import Album from './Album'
import Write from './Write'
import { getUser, postDocumentLike, deleteDocumentLike } from '../actions'
import { Button, Popover } from 'antd'

class Doc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAppend: false,
    }
    this.props.getUser()
  }

  onClickLikeIt() {
    const { content } = this.props
    const { user } = this.props

    if (content.likedUsers.findIndex((lover) => lover.id === user.id) === -1) {
      this.props.postDocumentLike(content.id)
    } else {
      this.props.deleteDocumentLike(content.id)
    }
  }

  toggleAppending() {
    this.setState({ isAppend: !this.state.isAppend })
  }

  render() {
    const { isAppend } = this.state
    const { content } = this.props
    const { author } = content
    const nickname = `${author.nTh}기 ${author.fullname}`
    const { createdAt } = content
    const imgsrc = author.profileImage.savedPath
    const imgalt = author.profileImage.filename
    // const images = content.images
    const { user } = this.props
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
            background: '#0000FF',
            marginRight: '4px',
            overflow: 'hidden',
          }}
          >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ flexGrow: 2 }}>
            <div style={{ fontSize: '14pt' }}>
              {
                author.nTh
                  ? (
                    <Popover
                      placement="leftTop"
                      content={<Namecard content={author} />}
                    >
                      <Link to={`/members/${author.username}`}>
                        {' '}
                        {nickname}
                        {' '}
                      </Link>
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
            user={user}
            documentId={this.props.content.id}
            isAppend
          />
        </div>
        <Line />
        <div style={{ marginTop: '4px', display: 'flex' }}>
          <div style={{ marginRight: '12px' }}>
            <Popover
              content={
                content.likedUsers.length
                  ? content.likedUsers.map((lover, idx) => (
                    <pre key={idx}>
                    {`${lover.nTh}기 ${lover.fullname}`}
                    </pre>
                  ))
                  : (
                    <pre>
                      당신이 이 글의 첫 번째 좋아요를 눌러주세요!
                    </pre>
                  )
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
                {`좋아요 ${content.likedUsers.length}`}
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
          {content.author.id === this.props.user.id
          ? 
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
          : <div />
          }
        </div>
      </div>
    )
  }
}

Doc.propTypes = {
  content: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  postDocumentLike: PropTypes.func.isRequired,
  deleteDocumentLike: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
  postDocumentLike,
  deleteDocumentLike,
})
export default connect(mapStateToProps, mapDispatchToProps)(Doc)
