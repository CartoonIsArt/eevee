import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Feed from './Feed'
import Ads from './Ads'
import Write from './Write'
import { getTimeline } from '../actions'

class Timeline extends Component {
  componentWillMount() {
    const timeline = this.props.timeline
    if (timeline.length === 0) { this.props.getTimeline() }
  }
  render() {
    const timeline = this.props.timeline
    return (
      <section style={{ padding: '0px 8px' }}>
        <Write />
        {timeline.map(feed =>
          (<Feed
            key={feed.id}
            content={feed}
          />),
        )}
        <Ads />
        <Ads />
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
})
const mapDispatchToProps = ({
  getTimeline,
})
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
