import { Affix, Col, Row } from 'antd'
import React, { Component } from 'react'
import Notifications from './Notifications'
import Profile from '../components/Profile'
import Timeline from '../components/Timeline'
import ExternalLinks from '../components/ExternalLinks'


class Portal extends Component {
  render() {
    return (
      <Row type="flex" style={{ maxWidth: '1280px', marginTop: '8px' }}>
        <Col xs={{ span: 0 }} xl={{ order: 1, span: 6 }}>
          <Affix offsetTop={56}>
            <Profile />
          </Affix>
        </Col>
        <Col xs={{ order: 2, span: 24 }} xl={{ order: 2, span: 12 }}>
          <Timeline />
        </Col>
        <Col xs={{ span: 0 }} xl={{ order: 3, span: 6 }}>
          <Affix offsetTop={56}>
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
    )
  }
}

export default Portal
