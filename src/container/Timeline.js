import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Feed from '../components/Feed'
// import Ads from './Ads'  Ads를 어떻게 쓸 지 더 고민해야합니다
import Write from '../components/Write'
import { getTimeline, getUser } from '../actions'

class Timeline extends Component {
  componentWillMount() {
    if (this.props.timeline.length === 0) {
      this.props.getTimeline()
    }
    if (this.props.user === undefined) {
      this.props.getUser()
    }
  }
  render() {
    const timeline = this.props.timeline
    const user = this.props.user
    return (
      <section style={{ padding: '0px 8px' }}>
        <Write
          user={user}
        />
        {timeline.map(feed =>
          (<Feed
            user={user}
            key={feed.id}
            content={feed}
          />),
        )}
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
