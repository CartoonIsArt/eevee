import React, { Component } from 'react'
import { Affix, Row, Col } from 'antd'
import Profile from './Profile'
import Noties from './Noties'
import Timeline from './Timeline'

class Portal extends Component {
  render() {
    return (
      <Row>
        <Col span={6}>
          <aside>
            <Profile />
            {/* future feature
            <Wiki />
            */}
          </aside>
        </Col>
        <Col span={12}>
          <Timeline />
        </Col>
        <Col span={6}>
          <Affix offsetTop={44}>
            <aside>
              <Noties />
              {/* future feature
              <div style={{ height: '516px' }} > chat </div>
              */ }
            </aside>
          </Affix>
        </Col>
      </Row>
    )
  }
}

export default Portal
