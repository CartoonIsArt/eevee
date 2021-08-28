import { Affix, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Notifications from './Notifications'
import { getFeed } from '../actions'
import ExternalLinks from '../components/ExternalLinks'
import Feed from '../components/Feed'
import Profile from '../components/Profile'


class SingleFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: {},
    }
  }

  componentWillMount() {
    /*
    if (this.props.auth === false) {
      this.props.getAccount()
    }
    */
    this.props.getFeed(this.props.match.params.id)
  }

  render() {
    const { feed } = this.props

    if (feed && Object.keys(feed).length === 0 && feed.constructor === Object)
      return (<div />);

    return (
      <Row type="flex" style={{ width: '1280px', marginTop: '8px' }}>
        <Col xs={{ span: 0 }} xl={{ order: 1, span: 6 }}>
          <Affix offsetTop={56}>
            <Profile />
          </Affix>
        </Col>
        <Col xs={{ order: 2, span: 24 }} xl={{ order: 2, span: 12 }}>
          {feed && ( // auth &&
            <section style={{ padding: '0px 8px' }}>
              <Feed feed={feed} />
            </section>
          )}
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
