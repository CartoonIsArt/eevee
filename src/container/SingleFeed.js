import React, { Component } from 'react'
import { connect } from 'react-redux'
import Profile from './Profile'
import Noties from './Noties'
import Feed from '../components/Feed'
import { getAccount } from '../actions'
import { getFeed } from '../fetches'
import { Affix, Row, Col } from 'antd'

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
    if (this.props.auth === false) {
      this.props.getAccount()
    }
    */
    const content = getFeed(this.props.match.params.id)
    this.setState({ content })
  }

  render() {
    const { content } = this.state
    const { account } = this.props
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
              account={account}
              content={content}
            />
          </section>
          )}
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

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleFeed)
