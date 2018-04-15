import React, { Component } from 'react'
import { Affix, Row, Col, Card } from 'antd'
import Profile from './Profile'
import Noties from './Noties'
import Timeline from './Timeline'

class Portal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggleDraw: false,
    }
  }
  onChanged() {
    this.setState({ toggleDraw: !this.state.toggleDraw })
  }
  render() {
    const toggleDraw = this.state.toggleDraw
    return (
      <Row style={{ width: '1280px', marginTop: '8px' }}>
        <Col span={6}>
          <aside>
            <Profile toggleDraw={toggleDraw} />
          </aside>
        </Col>
        <Col span={12}>
          <Timeline onChanged={() => this.onChanged()} toggleDraw={toggleDraw} />
        </Col>
        <Col span={6}>
          <Affix offsetTop={52}>
            <aside>
              <Noties />
              <Card title="외부링크" style={{ marginTop: '4px' }} >
                <p>
                  <a href="https://cia.kw.ac.kr/wiki/index.php"> 동아리 위키 </a>
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
