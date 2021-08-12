import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Namecard from './Namecard'
import Line from './Line'
import { printTime } from '../policy'
import { Popover, Tag, Icon } from 'antd'

class Noti extends Component {
  routeToFeed(feedId) {
    this.props.history.push(`/feed/${feedId}`)
  }

  makeAccountBadge(account) {
    if (account.role === "superuser") return (<Tag color="tomato"><Icon type="user" /> 관리자</Tag>)
    if (account.role === "board manager") return (<Tag color="yellowgreen"><Icon type="form" /> 임원진</Tag>)
    if (account.role === "manager") return (<Tag color="goldenrod"><Icon type="dollar" /> 총무</Tag>)
    return (<span />)
  }

  render() {
    const noti = this.props.content
    const nickname = `${noti.from.student.nTh}기 ${noti.from.student.name}`
    return (
      <div key={noti.id}>
        <div
          className="noti"
          // eslint-disable-next-line
          onClick={() => this.routeToFeed(noti.id)}
          style={
            noti.had_read
              ? { height: '56px', display: 'flex', alignItems: 'stretch' }
              : {
                background: '#bbdefb', height: '56px', display: 'flex', alignItems: 'stretch',
              }
}
        >
          <div
            style={{
              width: '48px', height: '48px', borderRadius: '24px', overflow: 'hidden', backgroundSize: 'cover',
            }}
          >
            <a href="#">
              <img
                width="100%"
                src={noti.from.profile.profileImage}
                alt={noti.from.profile.profileImage}
              />
            </a>
          </div>
          <div style={{
            flexGrow: '2', display: 'flex', alignItems: 'stretch', flexDirection: 'column',
          }}
          >
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '24px', marginLeft: '12px' }}>
                <Popover
                  placement="leftTop"
                  content={<Namecard content={noti.from} />}
                >
                  <a style={{ fontSize: '10pt' }} href="#">
                    <span>{nickname} {this.makeAccountBadge(noti.from)}</span>
                  </a>
                </Popover>
              </div>
              <div style={{ fontSize: '9pt', color: 'rgba(1,1,1,0.5)' }}>
                {printTime(noti.createdAt)}
              </div>
            </div>
            <div style={{ flexGrow: '1', display: 'flex', marginLeft: '12px' }}>
              <a href="#">
                <div style={{
                  fontSize: '9pt', 
                  color: 'rgba(0,0,0, 0.8)', wordWrap: 'break-word', WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', width: '232px', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box',
                }}
                >
                  { noti.content }
                </div>
              </a>
            </div>
          </div>
        </div>
        <Line />
      </div>
    )
  }
}

Noti.propTypes = {
  content: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default withRouter(Noti)
