import { Affix, Card, Col, Row } from 'antd'
import React, { Component } from 'react'
import Notifications from './Notifications'
import ExternalLinks from '../components/ExternalLinks'
import Profile from '../components/Profile'
import Timeline from '../components/Timeline'


class Portal extends Component {
  render() {
    return (
      <Card className="card-no-border">
        <Row type="flex" style={{ maxWidth: '1280px' }}>
          <Col xs={{ span: 0 }} xl={{ order: 1, span: 6 }}>
            <Affix offsetTop={71}>
              <Profile />
            </Affix>
          </Col>
          <Col xs={{ order: 2, span: 24 }} xl={{ order: 2, span: 12 }}>
            <Timeline />
          </Col>
          <Col xs={{ span: 0 }} xl={{ order: 3, span: 6 }}>
            <Affix offsetTop={71}>
              <Row gutter={[0, 8]}>
                <Col xs={24}><Notifications /></Col>
                <Col xl={24}><ExternalLinks /></Col>
                {/* future feature
                <div style={{ height: '516px' }} > chat </div>
                */ }
              </Row>
            </Affix>
          </Col>
          <Col xs={{ order: 1, span: 24 }} xl={{ span: 0 }}>
            <Notifications />
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Portal
