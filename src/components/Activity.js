import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Activity extends Component {
  render() {
    const account = this.props.content
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
          <div style={{ height: '50%' }}>글</div>
          <Link
            className="ant-anchor-link-title"
            to={`/members/${account.username}`}
          >
            {account.documentsCount}
          </Link>
        </div>
        <div style={{ width: '33%' }}>
          <div style={{ height: '50%' }}>댓글</div>
          <Link
            className="ant-anchor-link-title"
            to={`/members/${account.username}/comments`}
          >
            {account.commentsCount}
          </Link>
        </div>
        <div style={{ width: '33%' }}>
          <div style={{ height: '50%' }}>좋아요</div>
          <Link
            className="ant-anchor-link-title"
            to={`/members/${account.username}/likes`}
          >
            {account.likedDocumentsCount}
          </Link>
        </div>
      </div>
    )
  }
}

Activity.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Activity
