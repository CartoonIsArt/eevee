import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import Profile from './Profile'
import Notifications from './Notifications'
import Feed from '../components/Feed'
import { getFeed } from '../actions'
import { Affix, Row, Col } from 'antd'

class SingleFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: false,
    }
  }

  componentWillMount() {
    /*
    if (this.props.auth === false) {
      this.props.getAccount()
    }
    */
    this.props.getFeed(this.props.match.params.id)
      // .then(content => this.setState({ content }))
  }

  render() {
    const content = this.props.feed

    if (content && Object.keys(content).length === 0 && content.constructor === Object)
      return (<div />);

    return (
      <Row>
        <Col span={6}>
          <aside>
            <Profile />
          </aside>
        </Col>
        <Col span={12}>
          {content // auth &&
          && (
          <section style={{ padding: '0px 8px' }}>
            <Feed
              content={content}
            />
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
