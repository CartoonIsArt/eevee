import { Card } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Comments from './Comments'
import Document from './Document'


class Feed extends Component {
  state = {
    visibleComments: true,
  }

  toggleComment = () => {
    this.setState({ visibleComments: !this.state.visibleComments })
  }

  render() {
    const { feed } = this.props
    
    return (
      <Card size="small" className="feed-container">
        <Document
          feed={feed}
          toggleComment={this.toggleComment}
        />
        {this.state.visibleComments && <Comments feed={feed} />}
      </Card>
    )
  }
}

Feed.propTypes = {
  feed: PropTypes.object.isRequired,
}

export default Feed
