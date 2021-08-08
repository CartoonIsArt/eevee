import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon, Tag } from 'antd'

class Namecard extends Component {
  makeAccountBadge(account) {
    if (account.role === "superuser") return (<Tag color="tomato"><Icon type="user" /> 관리자</Tag>)
    if (account.role === "board manager") return (<Tag color="yellowgreen"><Icon type="form" /> 임원진</Tag>)
    if (account.role === "manager") return (<Tag color="goldenrod"><Icon type="dollar" /> 총무</Tag>)
    return (<div />)
  }

  render() {
    let cwidth = '320px' // component width
    const account = this.props.content
    const nickname = `${account.student.nTh}기 ${account.student.name}`
    cwidth = this.props.width
    return (
      <div style={{ width: cwidth }}>
        <a className="ant-anchor-link-title" href="#">
          <img width="100%" src={account.profile.profileImage} alt={account.profile.profileImage} />
        </a>
        <div style={{
          height: '98px',
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          lineHeight: '1rem',
        }}
        >
          <div style={{ fontSize: '18pt', textAlign: 'left' }}>
            <div style={{ height: '34%', fontWeight: 'bold' }}>
              <Link to={`/members/${account.username}`}>
                <span>{nickname} {this.makeAccountBadge(account)}</span>
              </Link>
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {account.student.major}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Namecard.propTypes = {
  content: PropTypes.object.isRequired,
  width: PropTypes.string,
}

Namecard.defaultProps = {
  width: '320px',
}

export default Namecard
