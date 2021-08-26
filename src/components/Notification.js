import { Avatar, Card, Popover } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Namecard from './Namecard'
import NameTag from './NameTag'
import { getFeed } from '../actions'
import { printTime } from '../lib'

const { Meta } = Card

class Notification extends Component {
  routeToFeed(feedId) {
    this.props.getFeed(feedId)
    this.props.history.push(`/feed/${feedId}`)
  }

  render() {
    const { notification } = this.props
    const imgsrc = notification.author.profile.profileImage

    return (
      <Meta
        className="notification-container"
        key={notification.id}
        onClick={() => this.routeToFeed(notification.id)}
        avatar={<Avatar className="notification-profile-contianer" src={imgsrc} alt={imgsrc}/>}
        title={
          <div>
            <Popover
              placement="leftTop"
              content={<Namecard account={notification.author} />}
            >
              <NameTag account={notification.author} minimizeIcon={true} />
            </Popover>
            <span className="notification-author-time">{printTime(notification.createdAt)}</span>
          </div>
        }
        description={ notification.content }
      />
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
