import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Namecard extends Component {
  render() {
    let cwidth = '320px' // component width
    const user = this.props.content
    const nickname = `${user.nTh}기 ${user.fullname}`
    cwidth = this.props.width
    return (
      <div style={{ width: cwidth }}>
        <a className="ant-anchor-link-title" href="#">
          <img width="100%" src={user.profileImage.savedPath} alt={user.profileImage.filename} />
        </a>
        <div style={{
          height: '98px',
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          lineHeight: '1rem',
        }}
        >
          <div style={{ fontSize: '18pt', textAlign: 'left' }}>
            <div style={{ height: '34%', fontWeight: 'bold' }}>
              <Link to={`/members/${user.username}`}>
                {nickname}
              </Link>
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {user.major}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Namecard.propTypes = {
  content: PropTypes.object.isRequired,
  width: PropTypes.string,
}

Namecard.defaultProps = {
  width: '320px',
}

export default Namecard
