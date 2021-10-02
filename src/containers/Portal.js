import { Affix, BackTop, Card, Col, Row } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Notifications from './Notifications'
import { getTimeline } from '../actions'
import ExternalLinks from '../components/ExternalLinks'
import Profile from '../components/Profile'
import Timeline from '../components/Timeline'
import Write from '../components/Write'


class Portal extends Component {
  state = {
    page: 1,
  }

  nextPage = () => this.setState({ page: this.state.page + 1 })

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
            <Row>
              <Col className="write" span={24}>
                <Write />
              </Col>
              <Col className="timeline" span={24}>
                <Timeline
                  getTimeline={this.props.getTimeline}
                  page={this.state.page}
                  nextPage={this.nextPage}
                />
              </Col>
            </Row>
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
        <BackTop/>
      </Card>
    )
  }
}

const mapStateToProps = () => ({
})
const mapDispatchToProps = ({
  getTimeline,
})
export default connect(mapStateToProps, mapDispatchToProps)(Portal)
