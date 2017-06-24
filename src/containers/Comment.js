import React, { Component } from 'react'
import { Button, Popover } from 'antd'
import Recomments from './Recomments'
import Profile from './Profile'

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
              <Popover
                content={<div style={{ width: '320px' }}> <Profile /> </div>}
                placement="leftTop"
              >
                <a> {author} </a>
              </Popover>
              {text}
            </p>
            <div style={{ display: 'flex' }}>
              <Popover
                content={
                  <pre>
                    19기 나인스
                  </pre>
                }
                placement="rightTop"
              >
                <a> Like 1 </a>
              </Popover>
              <a> Reply 3 </a>
              <div style={{ color: '#0a0a0' }}> 13hrs </div>
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
