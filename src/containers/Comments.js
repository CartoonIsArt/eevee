import React, { Component } from 'react'
import { Icon, Popover } from 'antd'
import Comment from './Comment'
import PostComment from './PostComment'
import Line from '../components/Line'

class Comments extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div style={{ background: '#fff', display: 'flex', flexDirection: 'column', padding: '8px', overflow: 'hidden' }} >
        <div>
          <Icon type="like" style={{ paddingRight: '4px' }} />
          <Popover
            content={
              <pre>
                  17기 찹쌀밥{'\n'}
                  18기 순두부{'\n'}
                  16기 닭죽{'\n'}
              </pre>
              }
            placement="rightTop"
          >
            <a> 3 </a>
          </Popover>
        </div>
        <Line />
        {iter.map(i =>
          <Comment key={i} />,
        )}
        <PostComment />
      </div>
    )
  }
}

export default Comments
