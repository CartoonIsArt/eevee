import { Card, Divider, Icon, List, message, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotifications } from '../actions'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import { getDate2WeeksAgo } from '../lib'

const { Meta } = Card


class Notifications extends Component {
  state = {
    isModalOn: false,
    loading: false,
  }

  componentDidMount() {
    this.props.getNotifications(getDate2WeeksAgo())
      .then(() => this.setState({ loading: true }))
      .catch((e) => { 
        message.error(`공지사항들을 불러오는데 실패했습니다: ${e.message}`)
        this.setState({ loading: true })
      })
  }

  hideModal() {
    this.setState({ isModalOn: false })
  }

  render() {
    const { notifications } = this.props
    const { loading } = this.state

    return (
      <Row id="notifications-wrapper">
        <Card className="notifications-card" size="small">
          <Meta
            avatar={<Icon type="notification" />}
            title="공지사항"
          />
          <Divider className="line" />
          <Loading loading={loading}>
            <List
              className="notifications-list"
              size="small"
              dataSource={notifications}
              renderItem={(noti) => (<List.Item><Notification notification={noti} key={noti.id} /></List.Item>)}
            />
          </Loading>
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
