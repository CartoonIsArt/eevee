import React, { Component } from 'react'
import { Button, Popover } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Recomments from './Recomments'
import Namecard from './Namecard'
import { printTime } from '../policy'

class Comment extends Component {
  render() {
    const content = this.props.content
    const user = this.props.user
    const author = content.author
    const nickname = `${author.nTh}기 ${author.fullname}`
    const imgsrc = author.profileImage.savedPath
    const imgalt = author.profileImage.filename

    return (
      <div style={{ margin: '2px 0px' }} >
        <div style={{ display: 'flex' }} >
          <div style={{ width: '32px', marginRight: '4px', height: '32px', background: '#fefefe' }} >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ width: '91%' }}>
            <p>
              <Popover
                content={<Namecard content={author} />}
                placement="leftTop"
              >
                <Link to={`/members/${author.username}`}> {nickname} </Link>
              </Popover>
              {content.text}
            </p>
            <div style={{ display: 'flex' }}>
              <Popover
                content={
                  <pre>
                    19기 나인스
                  </pre>
                }
                placement="rightTop"
              >
                <a> Like 1 </a>
              </Popover>
              <a> Reply 3 </a>
              <div style={{ color: '#0a0a0' }}>
                {printTime(content.createdAt)}
              </div>
            </div>
            <Recomments
              user={user}
              content={content.replies}
            />
          </div>
          <div>
            <Button icon="down" shape="circle" size="small" />
          </div>
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Comment
