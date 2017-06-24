import React, { Component } from 'react'
import { Button, Popover } from 'antd'
import Line from '../components/Line'
import Profile from './Profile'

class Doc extends Component {
  render() {
    const author = '육소빔' 
    const text = '전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. 전역하고싶다. '
    return (
      <div style={{ background: '#fff', maxHeight: '640px', padding: '8px', marginBottom: '1px' }} >
        <div style={{ display: 'flex', lineHeight: '16pt', marginBottom: '4px' }} >
          <div>
            <Popover
              placement="leftTop"
              content={
                <div style={{ width: '320px' }}>
                  <Profile />
                </div>
              }
            >
              <a href="#"> 누군가가 </a>
            </Popover>
            이 글을 좋아하겠지?
          </div>
          <div style={{ flexGrow: 2 }} />
          <div>
            <Button shape="circle" icon="down" size="small" />
          </div>
        </div>
        <Line />
        <div style={{ display: 'flex', marginTop: '4px' }}>
          <div style={{ width: '48px',
            height: '48px',
            background: '#0000FF',
            marginRight: '4px',
          }}
          />
          <div style={{ flexGrow: 2 }} >
            <div style={{ fontSize: '14pt' }}>
              <Popover
                placement="leftTop"
                content={
                  <div style={{ width: '320px' }}>
                    <Profile />
                  </div>
                }
              >
                <a> {author} </a>
              </Popover>
            </div>
            <div> 33 mins </div>
          </div>
        </div>
        <div style={{ margin: '4px 0px' }}>
          <p>
            {text}
          </p>
        </div>
        <div style={{ marginBottom: '4px', height: '320px', background: '#00FF00' }} />
        <Line />
        <div style={{ marginTop: '4px', display: 'flex' }}>
          <div style={{ marginRight: '4px' }}>
            <Button
              style={{ marginRight: '4px' }}
              shape="circle"
              icon="like"
              size="small"
            />
            <a>
              좋아요
            </a>
          </div>
          <div>
            <Button
              style={{ marginRight: '4px' }}
              shape="circle"
              icon="edit"
              size="small"
            />
            <a>
              댓글
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Doc
