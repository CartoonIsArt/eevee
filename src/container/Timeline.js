import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Feed from '../components/Feed'
// import Ads from './Ads'  Ads를 어떻게 쓸 지 더 고민해야합니다
import Write from '../components/Write'
import { getTimeline, getUser } from '../actions'
import { request } from '../fetches/request'

class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      response: '',
      redraw: false,
    }
  }
  componentWillMount() {
    if (this.props.timeline.length === 0) {
      this.props.getTimeline()
    }
    /*
    if (this.props.user.has_logged_in === false) {
      this.props.getUser()
    }
    */
  }
  componentWillReceiveProps(newProps) {
    if (newProps.redraw !== this.state.redraw) {
      this.props.getTimeline()
      this.setState({ redraw: newProps.redraw })
    }
  }
  writeComplete() {
    request('GET', 'documents', [])
    .then((res) => {
      this.props.timeline = res.data
      this.setState({
        response: res,
      })
    })
    .catch((err) => {
      this.setState({
        response: err.response,
      })
    })
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
            onLikeIt={() => this.props.onLikeIt()}
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
