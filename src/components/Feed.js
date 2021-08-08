import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Comments from './Comments'
import Doc from './Doc'

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
    const { content } = this.props
    const { account } = this.props
    return (
      <article style={{ marginBottom: '4px' }}>
        <Doc
          account={account}
          content={content}
          onClickComments={() => this.toggleCommentView()}
        />
        {
          viewComments
          && (
          <Comments
            account={content.author}
            content={content.comments}
            feed={content}
          />
          )
        }
      </article>
    )
  }
}

Feed.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Feed
