import React, { Component } from 'react'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import Namecard from './Namecard'
import Line from './Line'
import { printTime } from '../policy'
import { Popover } from 'antd'

class Noti extends Component {
  routeToFeed(feedId) {
    this.props.history.push(`/feed/${feedId}`)
  }

  render() {
    const noti = this.props.content
    const nickname = `${noti.from.nTh}기 ${noti.from.fullname}`
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
                src={noti.from.profileImage.savedPath}
                alt={noti.from.profileImage.filename}
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
                    {nickname}
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
