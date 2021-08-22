import PropTypes from 'prop-types'
import React, { Component } from 'react'
import PostRecomment from './PostRecomment'
import Recomment from './Recomment'


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
