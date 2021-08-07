import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Feed from '../components/Feed'
// import Ads from './Ads'  Ads를 어떻게 쓸 지 더 고민해야합니다
import Write from '../components/Write'
import { getTimeline, getUser } from '../actions'
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
    const { user } = this.props
    return (
      <section style={{ padding: '0px 8px' }}>
        {user.has_logged_in
          ? (
            <Write
              user={user}
              documentId={-1}
            />
          )
          : this.props.getUser()}
        {user.has_logged_in
          ? timeline.map((feed) => (
            <Feed
              user={user}
              key={feed.id}
              content={feed}
            />
          ))
          : this.props.getUser()}
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
  user: state.user,
})
const mapDispatchToProps = ({
  getTimeline,
  getUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
