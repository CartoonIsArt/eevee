import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Recomment from './Recomment'
import PostRecomment from './PostRecomment'

class Recomments extends Component {
  render() {
    const { viewRecomment } = this.props
    const recomments = this.props.content
    const { account } = this.props
    return (
      <div>
        {recomments.map((recomment) => (
          <Recomment
            key={recomment.id}
            content={recomment}
          />
        ))}
        {
          viewRecomment
          && (
          <PostRecomment
            account={account}
            commentId={this.props.commentId}
            onClickWriteRecomment={() => this.onClickWriteRecomment()}
          />
          )
        }
      </div>
    )
  }
}

Recomments.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Recomments
