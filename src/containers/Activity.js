import React, { Component } from 'react'

const value = {
  nMemories: 1,
  nComments: 2,
  nLikes: 3,
}

class Activity extends Component {
  render() {
    return (
      <div style={{ height: '98px',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '16pt',
        padding: '12px',
      }}
      >
        <div style={{ width: '34%' }}>
          <div style={{ height: '50%' }}> 글</div>
          <a className="ant-anchor-link-title" href="#"> {value.nMemories} </a>
        </div>
        <div style={{ width: '33%' }}>
          <div style={{ height: '50%' }}> 댓글 </div>
          <a className="ant-anchor-link-title" href="#"> {value.nComments} </a>
        </div>
        <div style={{ width: '33%' }}>
          <div style={{ height: '50%' }}> 좋아요 </div>
          <a className="ant-anchor-link-title" href="#"> {value.nLikes} </a>
        </div>
      </div>
    )
  }
}

export default Activity
