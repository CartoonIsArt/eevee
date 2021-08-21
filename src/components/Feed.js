import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Comments from './Comments'
import Document from './Document'


class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewComments: true,
    }
  }

  toggleCommentView() {
    this.setState({
      viewComments: !this.state.viewComments,
    })
  }

  render() {
    const { viewComments } = this.state
    const { feed } = this.props
    
    return (
      <article style={{ marginBottom: '4px' }}>
        <Document
          feed={feed}
          onClickComments={() => this.toggleCommentView()}
        />
        {
          viewComments
          && (
          <Comments
            comments={feed.comments}
            feed={feed}
          />
          )
        }
      </article>
    )
  }
}

Feed.propTypes = {
  feed: PropTypes.object.isRequired,
}

export default Feed
