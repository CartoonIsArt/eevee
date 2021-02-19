import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Activity extends Component {
  render() {
    const {user} = this.props.content
    return (
      <div style={{
        height: '98px',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '16pt',
        padding: '12px',
        textAlign: 'center',
      }}
      >
        <div style={{ width: '34%' }}>
          <div style={{ height: '50%' }}> 글</div>
          <a className="ant-anchor-link-title" href="#">
            {' '}
            {user.nDocuments}
            {' '}
          </a>
        </div>
        <div style={{ width: '33%' }}>
          <div style={{ height: '50%' }}> 댓글 </div>
          <a className="ant-anchor-link-title" href="#">
            {' '}
            {user.nComments}
            {' '}
          </a>
        </div>
        <div style={{ width: '33%' }}>
          <div style={{ height: '50%' }}> 좋아요 </div>
          <a className="ant-anchor-link-title" href="#">
            {' '}
            {user.nDocumentLikes}
            {' '}
          </a>
        </div>
      </div>
    )
  }
}

Activity.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Activity
