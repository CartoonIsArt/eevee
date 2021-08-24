import { Popover } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Namecard from './Namecard'
import NameTag from './NameTag'
import { getFeed } from '../actions'
import { printTime } from '../lib'


class Notification extends Component {
  routeToFeed(feedId) {
    this.props.getFeed(feedId)
    this.props.history.push(`/feed/${feedId}`)
  }

  render() {
    const { notification } = this.props
    
    return (
      <div
        key={notification.id}
        className="noti"
        onClick={() => this.routeToFeed(notification.id)}
        style={{ height: '56px', display: 'flex', alignItems: 'stretch' }}
      >
        <div
          style={{
            width: '48px', height: '48px', borderRadius: '24px', overflow: 'hidden', backgroundSize: 'cover',
          }}
        >
          <img
            width="100%"
            src={notification.author.profile.profileImage}
            alt={notification.author.profile.profileImage}
          />
        </div>
        <div style={{
          flexGrow: '2', display: 'flex', alignItems: 'stretch', flexDirection: 'column',
        }}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '8px', marginLeft: '12px' }}>
              <Popover
                placement="leftTop"
                content={<Namecard account={notification.author} />}
              >
                <div style={{ fontSize: '10pt' }}>
                  <NameTag account={notification.author} minimizeIcon={true} />
                </div>
              </Popover>
            </div>
            <div style={{ fontSize: '9pt', color: 'rgba(1,1,1,0.5)' }}>
              {printTime(notification.createdAt)}
            </div>
          </div>
          <div style={{ flexGrow: '1', display: 'flex', marginLeft: '12px' }}>
            <div style={{
              fontSize: '9pt', 
              color: 'rgba(0,0,0, 0.8)', wordWrap: 'break-word', WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', width: '232px', textOverflow: 'ellipsis', overflow: 'hidden', display: '-webkit-box',
            }}
            >
              { notification.content }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired,
  getFeed: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  getFeed,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Notification))
