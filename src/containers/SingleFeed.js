import { Affix, Card, Col, message, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Notifications from './Notifications'
import Page404 from './Page404'
import { getFeed } from '../actions'
import ExternalLinks from '../components/ExternalLinks'
import Feed from '../components/Feed'
import Profile from '../components/Profile'
import { isEmptyObject } from '../lib'
import Loading from '../components/Loading'


class SingleFeed extends Component {
  state = {
    loading: false,
  }

  componentDidMount() {
    /*
    if (this.props.auth === false) {
      this.props.getAccount()
    }
    */
    this.props.getFeed(this.props.match.params.id)
      .then(() => this.setState({ loading: true }))
      .catch((e) => { 
        message.error(`피드 정보를 불러오는데 실패했습니다: ${e.message}`)
        this.setState({ loading: true })
      })
  }

  render() {
    const { feed } = this.props
    
    return (
      <Loading loading={this.state.loading}>
        {feed && !isEmptyObject(feed)
          ? (
          <Card className="card-no-border">
            <Row type="flex" style={{ maxWidth: '1280px', marginTop: '8px' }}>
              <Col xs={{ span: 0 }} xl={{ order: 1, span: 6 }}>
                <Affix offsetTop={56}>
                  <Profile />
                </Affix>
              </Col>
              <Col xs={{ order: 2, span: 24 }} xl={{ order: 2, span: 12 }} style={{ padding: '0px 8px' }}>
                <Feed feed={feed} />
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
          </Card>
          )
          : <Page404 />
        }
      </Loading>
    )
  }
}

SingleFeed.propTypes = {
  history: PropTypes.object.isRequired,
  getFeed: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  feed: state.feed,
})
const mapDispatchToProps = ({
  getFeed,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleFeed))
