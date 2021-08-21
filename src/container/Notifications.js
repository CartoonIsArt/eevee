import { Icon } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNotifications } from '../actions'
import Line from '../components/Line'
import Notification from '../components/Notification'
import { getDate2WeeksAgo } from '../lib'


class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOn: false,
    }
  }
  componentWillMount() {
    this.props.getNotifications(getDate2WeeksAgo())
  }

  hideModal() {
    this.setState({ isModalOn: false })
  }

  render() {
    const { notifications } = this.props

    return (
      <div>
        <div style={{ height: '192px', backgroundColor: 'white', padding: '4px' }}>
          <div style={{
            height: '28px', fontSize: '12pt', textAlign: 'left', display: 'flex', flexDrection: 'column',
          }}
          >
            <div style={{ marginRight: '156px', marginLeft: '12px', fontSize: '12pt' }}>
              <Icon type="notification" />
              <span style={{ marginLeft: "12px" }}>공지사항</span>
            </div>
          </div>
          <Line />
          <div style={{ height: '156px', overflowY: 'scroll' }}>
            {notifications.map((noti) => <Notification notification={noti} key={noti.id} />)}
          </div>
        </div>
      </div>
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
