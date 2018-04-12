import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Doc from './Doc'
import Comments from './Comments'

class Feed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewComments: false,
    }
  }
  toggleCommentView() {
    this.setState({
      viewComments: !this.state.viewComments,
    })
  }
  render() {
    const viewComments = this.state.viewComments
    const content = this.props.content
    const user = this.props.user
    return (
      <article style={{ marginBottom: '4px' }}>
        <Doc
          user={user}
          content={content}
          onClickComments={() => this.toggleCommentView()}
        />
        <Comments
          user={content.author}
          content={content.comments}
          feed={content}
          viewComments={viewComments}
        />
      </article>
    )
  }
}

Feed.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Feed
