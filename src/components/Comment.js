import React, { Component } from 'react'
import { Button, Popover } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Recomments from './Recomments'
import Namecard from './Namecard'
import { printTime } from '../policy'

class Comment extends Component {
  render() {
    const author = this.props.content.author.last_name
    const text = this.props.content.text
    const createdAt = this.props.content.write_date
    const recomments = this.props.content.recomments
    const imgsrc = this.props.content.author.image.src
    const imgalt = this.props.content.author.image.alt
    const user = this.props.user
    const commentId = this.props.content.id
    return (
      <div style={{ margin: '2px 0px' }} >
        <div style={{ display: 'flex' }} >
          <div style={{ width: '32px', marginRight: '4px', height: '32px', background: '#fefefe' }} >
            <img src={imgsrc} alt={imgalt} style={{ width: '100%' }} />
          </div>
          <div style={{ width: '91%' }}>
            <p>
              <Popover
                content={<Namecard content={this.props.content.author} />}
                placement="leftTop"
              >
                <Link to={`/members/${author}`}> {author} </Link>
              </Popover>
              {text}
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
                {printTime(createdAt)}
              </div>
            </div>
            <Recomments
              commentId={commentId}
              user={user}
              content={recomments}
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
