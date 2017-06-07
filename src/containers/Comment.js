import React, { Component } from 'react'
import { Button } from 'antd'

class Comment extends Component {
  render() {
    const author = 'John'
    const text = 'I want to be honorably discharged... I want to be honorably discharged... I want to be honorably discharged... I want to be honorably discharged... '
    return (
      <div>
        <div style={{ display: 'flex' }} >
          <div style={{ width: '32px', height: '32px', background: '#00FF00'}} />
          <div style={{ width: '91%' }}>
            <p>
              <a> {author} </a> 
              {text}
            </p>
            <div>
              <a> Like </a> <a> Reply </a> 13hrs
            </div>
          </div>
          <div>
            <Button icon='down' size='small' />
          </div>
        </div>
      </div>
    )
  }
}

export default Comment
