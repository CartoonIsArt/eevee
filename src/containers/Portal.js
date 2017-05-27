import React, { Component } from 'react'
import { Affix, Row, Col } from 'antd'
import Profile from './Profile'
import Wiki from './Wiki'
import Noties from './Noties'
import Timeline from './Timeline'

class Portal extends Component {
  render() {
    return (
      <Row>
        <Col span={6}>
          <aside>
              <Profile />
              <Wiki />
          </aside> 
        </Col>
        <Col span={12}>
          <Timeline />
        </Col>
        <Col span={6}>
          <Affix offsetTop={44}>
            <aside>
              <Noties />
              <div style={{height: "516px"}} > chat </div>
            </aside>
          </Affix>
        </Col>
      </Row>
    )
  }
}

export default Portal
