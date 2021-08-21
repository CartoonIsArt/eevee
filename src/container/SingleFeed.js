import { Affix, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Notifications from './Notifications'
import Profile from './Profile'
import { getFeed } from '../actions'
import Feed from '../components/Feed'


class SingleFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feed: false,
    }
  }

  componentWillMount() {
    /*
    if (this.props.auth === false) {
      this.props.getAccount()
    }
    */
    this.props.getFeed(this.props.match.params.id)
      // .then(feed => this.setState({ feed }))
  }

  render() {
    const { feed } = this.props

    if (feed && Object.keys(feed).length === 0 && feed.constructor === Object)
      return (<div />);

    return (
      <Row>
        <Col span={6}>
          <aside>
            <Profile />
          </aside>
        </Col>
        <Col span={12}>
          {feed // auth &&
          && (
          <section style={{ padding: '0px 8px' }}>
            <Feed feed={feed} />
          </section>
          )}
        </Col>
        <Col span={6}>
          <Affix offsetTop={44}>
            <aside>
              <Notifications />
            </aside>
          </Affix>
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
