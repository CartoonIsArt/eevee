import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Line from '../components/Line'
import Noti from '../components/Noti'
import { getNotifications } from '../actions'
import { Icon, Modal, notification } from 'antd'
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
            {notifications.map((noti) => <Noti content={noti} key={noti.id} />)}
          </div>
        </div>
      </div>
    )
  }
}

Notifications.propTypes = {
  notifications: PropTypes.array,
  getNotifications: PropTypes.func.isRequired,
}

Notifications.defaultProps = {
  notifications: [],
}

const mapStateToProps = (state) => ({
  notifications: state.notifications,
})
const mapDispatchToProps = ({
  getNotifications,
})

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)