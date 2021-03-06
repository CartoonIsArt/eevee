import React, { Component } from 'react'
import Profile from './Profile'
import Noties from './Noties'
import Timeline from './Timeline'
import { Affix, Row, Col, Card } from 'antd'

class Portal extends Component {
  render() {
    return (
      <Row style={{ width: '1280px', marginTop: '8px' }}>
        <Col span={6}>
          <Affix offsetTop={56}>
            <aside>
              <Profile />
            </aside>
          </Affix>
        </Col>
        <Col span={12}>
          <Timeline />
        </Col>
        <Col span={6}>
          <Affix offsetTop={56}>
            <aside>
              <Noties />
              <Card title="외부링크">
                <p>
                  {/* <a href="https://cia.kw.ac.kr/wiki/index.php"> 동아리 위키 </a> */}
                  <a href="https://cafe.naver.com/ciapg523"> 동아리 카페 </a>
                </p>
                <p>
                  <a href="https://github.com/CartoonIsArt/"> 인사부 열정페이팀 </a>
                </p>
              </Card>
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
