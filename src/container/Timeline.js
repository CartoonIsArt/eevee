import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Feed from '../components/Feed'
// import Ads from './Ads'  Ads를 어떻게 쓸 지 더 고민해야합니다
import Write from '../components/Write'
import { getTimeline, getUser, isAlmostScrolled } from '../actions'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      toggleDraw: false,
      page: 1,
      doclen: 0,
    }
    this.mutex = true
    this.wrapper = e => this.loadMore(e)
  }
  componentWillMount() {
    if (this.props.timeline.length === 0) {
      this.props.getTimeline()
      this.setState({ doclen: this.props.timeline.length })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.wrapper)
  }
  componentWillReceiveProps(newProps) {
    if ((newProps.toggleDraw !== this.state.toggleDraw) &&
    (this.state.doclen !== this.props.timeline.length)) {
      this.props.getTimeline(this.state.page)
      this.setState({
        toggleDraw: newProps.toggleDraw,
      })
    }
  }
  componentWillUnmount() {
    window.addEventListener('scroll', this.wrapper)
  }
  loadMore(e) {
    const page = this.state.page
    const timelinelen = this.props.timeline.length
    e.preventDefault()
    if (this.mutex && isAlmostScrolled() &&
      (this.state.doclen !== timelinelen)) {
      this.mutex = false
      this.props.getTimeline(page + 1)
      this.setState({
        page: page + 1,
        doclen: timelinelen,
      }, () => { this.mutex = true })
      this.props.onChanged()
    }
  }
  writeComplete() {
    this.props.getTimeline()
    this.setState({
      page: 1,
      doclen: this.props.timeline.length,
    })
    this.props.onChanged()
  }
  render() {
    const timeline = this.props.timeline
    const user = this.props.user
    return (
      <section style={{ padding: '0px 8px' }}>
        {user.has_logged_in ?
          <Write
            user={user}
            writeComplete={() => this.writeComplete()}
            isAppending={false}
          /> :
          this.props.getUser()
        }
        {user.has_logged_in ?
        timeline.map(feed =>
          (<Feed
            user={user}
            key={feed.id}
            content={feed}
            onChanged={() => this.props.onChanged()}
            writeComplete={() => this.writeComplete()}
          />),
        ) :
        this.props.getUser()}
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

const mapStateToProps = state => ({
  timeline: state.timeline,
  user: state.user,
})
const mapDispatchToProps = ({
  getTimeline,
  getUser,
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
