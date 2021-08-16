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

  confirmDeleteReadNotifications() {
    this.setState({ isModalOn: true })
  }

  deleteReadNotifications() {
    // TODO: implement here
    notification.success({
      message: '삭제했습니다',
      duration: 1,
    })
    this.setState({ isModalOn: false })
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
            </div>
            <div style={{ fontSize: '12pt', marginTop: '4px' }}>
              <a onClick={() => this.confirmDeleteReadNotifications()}>
                읽은 내역 지우기
              </a>
              <Modal
                visible={this.state.isModalOn}
                onOk={() => this.deleteReadNotifications()}
                onCancel={() => this.hideModal()}
              >
                이미 읽은 공지 내역을 삭제합니다.
              </Modal>
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
