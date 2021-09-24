import { Card, Divider, Icon, List, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotifications } from '../actions'
import Notification from '../components/Notification'
import { getDate2WeeksAgo } from '../lib'

const { Meta } = Card


class Notifications extends Component {
  state = {
    isModalOn: false,
  }

  componentDidMount() {
    this.props.getNotifications(getDate2WeeksAgo())
  }

  hideModal() {
    this.setState({ isModalOn: false })
  }

  render() {
    const { notifications } = this.props

    return (
      <Row id="notifications-wrapper">
        <Card className="notifications-card" size="small">
          <Meta
            avatar={<Icon type="notification" />}
            title="공지사항"
          />
          <Divider className="line" />
          <List
            className="notifications-list"
            size="small"
            dataSource={notifications}
            renderItem={(noti) => (<List.Item><Notification notification={noti} key={noti.id} /></List.Item>)}
          />
          <Divider className="line" />
        </Card>
      </Row>
    )
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  getNotifications: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
})
const mapDispatchToProps = ({
  getNotifications,
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
