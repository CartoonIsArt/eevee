import { Avatar, Card, message } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import NameTag from './NameTag'
import { getFeed } from '../actions'
import { printTime } from '../lib'

const { Meta } = Card

class Notification extends Component {
  routeToFeed(feedId) {
    this.props.getFeed(feedId)
      .catch((e) => message.error(`해당 글을 불러오는데 실패했습니다: ${e.message}`))
    this.props.history.push(`/feed/${feedId}`)
  }

  render() {
    const { notification } = this.props

    return (
      <Meta
        className="notification-container"
        key={notification.id}
        onClick={() => this.routeToFeed(notification.id)}
        avatar={
          <Avatar
            className="notification-profile"
            alt="공지사항 작성자 프로필 이미지"
            src={notification.author.profile.profileImage}
          />
        }
        title={
          <div>
            <NameTag account={notification.author} minimizeIcon hasPopover />
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
