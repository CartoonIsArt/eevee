import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Recomment from './Recomment'
import PostRecomment from './PostRecomment'

class Recomments extends Component {
  render() {
    const viewRecomment = this.props.viewRecomment
    const recomments = this.props.content
    const user = this.props.user
    return (
      <div>
        {recomments.map(recomment =>
          (<Recomment
            key={recomment.id}
            content={recomment}
          />),
        )}
        {
          viewRecomment &&
          <PostRecomment
            user={user}
            commentId={this.props.commentId}
          />
        }
      </div>
    )
  }
}

Recomments.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Recomments
