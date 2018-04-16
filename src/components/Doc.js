import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Popover } from 'antd'
import Line from './Line'
import Namecard from './Namecard'
import { printTime } from '../policy'
// import Album from './Album'
import Write from '../container/Write'
import { request } from '../fetches/request'
import { getTimeline, getUser } from '../actions'

class Doc extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAppending: false,
    }
  }
  onClickLikeIt() {
    const content = this.props.content
    const user = this.props.user

    if (content.likedBy.findIndex(lover => lover.id === user.id) === -1) {
      request('POST', `documents/${content.id}/LikeIt`, [])
        .then(() => {
          this.props.getUser()
          this.props.getTimeline()
        })
        .catch((e) => {
          console.log(e)
        })
    } else {
      request('DELETE', `documents/${content.id}/LikeIt`, [])
        .then(() => {
          this.props.getUser()
          this.props.getTimeline()
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
  toggleAppending() {
    this.setState({ isAppending: !this.state.isAppending })
  }
  render() {
    const isAppending = this.state.isAppending
    const content = this.props.content
    const author = content.author
    const nickname = `${author.nTh}기 ${author.fullname}`
    const text = content.text
    const createdAt = content.createdAt
    const imgsrc = author.profileImage.savedPath
    const imgalt = author.profileImage.filename
    // const images = content.images
    const user = this.props.user
    return (
      <div style={{ background: '#fff', padding: '8px', marginBottom: '1px' }} >
        <div style={{ display: 'flex', lineHeight: '16pt', marginBottom: '4px' }} >
          <div>
            여기는 뭘 넣으면 예쁠까?
          </div>
          <div style={{ flexGrow: 2 }} />
          <div>
            <Button shape="circle" icon="down" size="small" />
          </div>
        </div>
        <Line />
        <div style={{ display: 'flex', marginTop: '4px' }}>
          <div style={{ width: '48px',
            height: '48px',
            background: '#0000FF',
            marginRight: '4px',
            overflow: 'hidden',
          }}
          >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ flexGrow: 2 }} >
            <div style={{ fontSize: '14pt' }}>
              {
                author.nTh ?
                  <Popover
                    placement="leftTop"
                    content={<Namecard content={author} />}
                  >
                    <Link to={`/members/${author.username}`}> {nickname} </Link>
                  </Popover>
                  : <div> 탈퇴한 회원 </div>
              }
            </div>
            <div> {printTime(createdAt)} </div>
          </div>
        </div>
        <div style={{ margin: '4px 0px' }}>
          <ReactMarkdown source={text} />
        </div>
        { /* <Album content={images} height="320px" /> */ }
        <div style={isAppending ? { display: 'block' } : { display: 'none' }} >
          <Write
            user={user}
            feedId={content.id}
          />
        </div>
        <Line />
        <div style={{ marginTop: '4px', display: 'flex' }}>
          <div style={{ marginRight: '4px' }}>
            <Button
              style={{ marginRight: '4px' }}
              shape="circle"
              icon="like"
              size="small"
              onClick={() => this.onClickLikeIt()}
            />
            <a onClick={() => this.onClickLikeIt()}>
              좋아요
            </a>
          </div>
          <div style={{ marginRight: '4px' }}>
            <Button
              style={{ marginRight: '4px' }}
              shape="circle"
              icon="edit"
              size="small"
              onClick={() => this.props.onClickComments()}
            />
            <a onClick={() => this.props.onClickComments()}>
              댓글
            </a>
          </div>
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
        </div>
      </div>
    )
  }
}

Doc.propTypes = {
  content: PropTypes.object.isRequired,
  getTimeline: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getTimeline,
  getUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(Doc)
