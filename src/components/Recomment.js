import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Namecard from './Namecard'
import { Popover, Tag, Icon } from 'antd'

class Recomment extends Component {
  makeAccountBadge(account) {
    if (account.role === "superuser") return (<Tag color="tomato"><Icon type="user" /> 관리자</Tag>)
    if (account.role === "board manager") return (<Tag color="yellowgreen"><Icon type="form" /> 임원진</Tag>)
    if (account.role === "manager") return (<Tag color="goldenrod"><Icon type="dollar" /> 총무</Tag>)
    return (<span />)
  }

  render() {
    const { content } = this.props
    const { author } = content
    const nickname = `${author.student.nTh}기 ${author.student.name}`
    const { text } = content
    const imgsrc = author.profile.profileImage
    const imgalt = author.profile.profileImage
    return (
      <div style={{ margin: '2px 0px' }}>
        <div style={{ display: 'flex' }}>
          <div style={{
            width: '32px', marginRight: '4px', height: '32px', background: '#686868',
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
                <a><span> {nickname} {this.makeAccountBadge(author)} </span></a>
              </Popover>
              {text}
            </p>
            <div>
              <a> Like 2 </a>
              {' '}
              13hrs
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Recomment.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Recomment
