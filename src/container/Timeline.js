import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import Ads from './Ads'  Ads를 어떻게 쓸 지 더 고민해야합니다
import { getAccount, getTimeline } from '../actions'
import Feed from '../components/Feed'
import Write from '../components/Write'
import { isAlmostScrolled } from '../lib'


class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      page: 1,
      doclen: 0,
    }
    this.mutex = true
    this.wrapper = (e) => this.loadMore(e)
  }

  componentWillMount() {
    this.props.getTimeline()
    this.setState({ doclen: this.props.timeline.length })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.wrapper)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.wrapper)
  }

  loadMore(e) {
    const { page } = this.state
    const timelinelen = this.props.timeline.length
    e.preventDefault()
    if (this.mutex && isAlmostScrolled()
      && (this.state.doclen !== timelinelen)) {
      this.mutex = false
      this.props.getTimeline(page + 1)
      this.setState({
        page: page + 1,
        doclen: timelinelen,
      }, () => { this.mutex = true })
    }
  }

  render() {
    const { timeline } = this.props
    return (
      <section style={{ padding: '0px 8px' }}>
        <Write
          documentId={-1}
        />
        {timeline.map((feed) => (
          <Feed
            key={feed.id}
            feed={feed}
          />
        ))}
        { /*
        <Ads />
        <Ads />
        */ }
      </section>
    )
  }
}

Timeline.propTypes = {
  timeline: PropTypes.array,
  getTimeline: PropTypes.func.isRequired,
}

Timeline.defaultProps = {
  timeline: [],
}

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  account: state.account,
})
const mapDispatchToProps = ({
  getTimeline,
  getAccount,
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
