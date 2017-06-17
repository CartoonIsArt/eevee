import React, { Component } from 'react'
import { Icon } from 'antd'
import Recomment from './Recomment'
import PostComment from './PostComment'
import Line from '../components/Line'

class Recomments extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div>
        {iter.map(i =>
          <Recomment key={i} />,
        )}
      </div>
    )
  }
}

export default Recomments
