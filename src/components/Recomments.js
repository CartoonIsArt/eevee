import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Recomment from './Recomment'
import PostComment from './PostComment'

class Recomments extends Component {
  render() {
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
        <PostComment user={user} />
      </div>
    )
  }
}

Recomments.propTypes = {
  content: PropTypes.array.isRequired,
}

export default Recomments
