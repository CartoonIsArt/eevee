import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Recomment from './Recomment'
import PostRecomment from './PostRecomment'

class Recomments extends Component {
  render() {
    const { viewRecomment, recomments } = this.props
    return (
      <div>
        {recomments.map((recomment) => (
          <Recomment
            key={recomment.id}
            recomment={recomment}
          />
        ))}
        {
          viewRecomment
          && (
          <PostRecomment
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
  recomments: PropTypes.array.isRequired,
}

export default Recomments
