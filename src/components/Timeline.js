import { message } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccount } from '../actions'
import Feed from './Feed'
import Loading from './Loading'
import { isAlmostScrolled } from '../lib'


class Timeline extends Component {
  state = {
    loading: false,
  }
  mutex = true

  componentWillMount() {
    const { username, page } = this.props

    this.props.getTimeline({ username, page })
      .then(() => this.setState({ loading: true }))
      .catch((e) => {
        message.error(`타임라인을 불러오는데 실패했습니다: ${e.message}`)
        this.setState({ loading: true })
      })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.loadMore)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadMore)
  }

  loadMore = (e) => {
    const { username, page, nextPage } = this.props

    e.preventDefault()

    if (this.mutex && isAlmostScrolled()) {
      this.mutex = false

      this.props.getTimeline({ username, page: page + 1 })
        .then(() => {
          nextPage()
          this.mutex = true
        })
    }
  }

  render() {
    return (
      <Loading loading={this.state.loading}>
        {this.props.timeline.map(feed => <Feed key={feed.id} feed={feed} />)}
      </Loading>
    )
  }
}

Timeline.propTypes = {
  getTimeline: PropTypes.func.isRequired,
  username: PropTypes.string,
  page: PropTypes.number.isRequired,
  nextPage: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
