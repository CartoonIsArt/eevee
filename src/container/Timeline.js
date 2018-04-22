import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Feed from '../components/Feed'
// import Ads from './Ads'  Ads를 어떻게 쓸 지 더 고민해야합니다
import Write from '../components/Write'
import { getTimeline, getUser } from '../actions'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      redraw: false,
    }
  }
  componentWillMount() {
    this.props.getTimeline()
  }
  render() {
    const timeline = this.props.timeline
    const user = this.props.user
    return (
      <section style={{ padding: '0px 8px' }}>
        {user.has_logged_in ?
          <Write
            user={user}
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
