import React, { Component } from 'react'
import { Button } from 'antd'
import Recomments from './Recomments'

class Comment extends Component {
  render() {
    const author = '해소빔'
    const text = '병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. 병장만기전역하고싶다. '
    return (
      <div style={{ margin: '2px 0px' }} >
        <div style={{ display: 'flex' }} >
          <div style={{ width: '32px', marginRight: '4px', height: '32px', background: '#00FF00' }} />
          <div style={{ width: '91%' }}>
            <p>
              <a> {author} </a>
              {text}
            </p>
            <div>
              <a> Like 1 </a> <a> Reply 3 </a> 13hrs
            </div>
            <Recomments />
          </div>
          <div>
            <Button icon="down" shape="circle" size="small" />
          </div>
        </div>
      </div>
    )
  }
}

export default Comment
