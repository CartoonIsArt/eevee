import { Col, Popover, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Line from './Line'
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
      <Row key={notification.id}>
        <Row
          className="noti"
          onClick={() => this.routeToFeed(notification.id)}
          style={{ height: '56px', display: 'flex', alignItems: 'stretch' }}
        >
          <Col
            style={{
              width: '48px', height: '48px', borderRadius: '24px', overflow: 'hidden', backgroundSize: 'cover',
            }}
          >
            <img
              width="100%"
              src={notification.author.profile.profileImage}
              alt={notification.author.profile.profileImage}
            />
          </Col>
          <Col>
            <Row>
              <Col span={12} style={{ marginRight: '8px', marginLeft: '12px' }}>
                <Popover
                  placement="leftTop"
                  content={<Namecard account={notification.author} />}
                >
                  <NameTag account={notification.author} minimizeIcon={true} />
                </Popover>
              </Col>
              <Col span={10} style={{ fontSize: '9pt', color: 'rgba(1,1,1,0.5)' }}>
                {printTime(notification.createdAt)}
              </Col>
            </Row>
            <Row style={{ marginLeft: '12px', fontSize: '9pt', 
              WebkitBoxOrient: 'vertical', WebkitLineClamp: '2', width: '232px', overflow: 'hidden', display: '-webkit-box',
            }}
            >
              { notification.content }
            </Row>
          </Col>
        </Row>
        <Line />
      </Row>
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
