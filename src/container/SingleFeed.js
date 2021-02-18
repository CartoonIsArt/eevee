import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import Noties from './Noties'
import Feed from '../components/Feed'
import { getUser } from '../actions'
import { getFeed } from '../fetches'

const Affix = require('antd/lib/affix')
const Row = require('antd/lib/row')
const Col = require('antd/lib/col')

class SingleFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: false,
    }
  }
  componentWillMount() {
    /* future
    this.props.getFeed(this.props.params.id)
    .then(content => this.setState({content}))
    */
    /*
    if (this.props.user.has_logged_in === false) {
      this.props.getUser()
    }
    */
    const content = getFeed(this.props.match.params.id)
    this.setState({ content })
  }
  render() {
    const content = this.state.content
    const user = this.props.user
    return (
      <Row>
        <Col span={6}>
          <aside>
            <Profile />
          </aside>
        </Col>
        <Col span={12}>
          {content && // user.has_logged_in &&
          <section style={{ padding: '0px 8px' }} >
            <Feed
              user={user}
              content={content}
            />
          </section>
          }
        </Col>
        <Col span={6}>
          <Affix offsetTop={44}>
            <aside>
              <Noties />
            </aside>
          </Affix>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleFeed)
