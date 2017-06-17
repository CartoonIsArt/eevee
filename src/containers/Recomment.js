import React, { Component } from 'react'
import { Button } from 'antd'

class Comment extends Component {
  render() {
    const author = '짜장밥'
    const text = '배고프다. 오늘 저녁이 뭐더라...?? 어어으으ㅡㅇ 흐므읗그전역하고싶다.'
    return (
      <div style={{ margin: '2px 0px' }} >
        <div style={{ display: 'flex' }} >
          <div style={{ width: '32px', marginRight: '4px', height: '32px', background: '#686868' }} />
          <div style={{ width: '91%' }}>
            <p>
              <a> {author} </a>
              {text}
            </p>
            <div>
              <a> Like 2 </a> 13hrs
            </div>
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
