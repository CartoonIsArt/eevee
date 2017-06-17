import React, { Component } from 'react'
import Recomment from './Recomment'
import PostComment from './PostComment'

class Recomments extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div>
        {iter.map(i =>
          <Recomment key={i} />,
        )}
        <PostComment />
      </div>
    )
  }
}

export default Recomments
