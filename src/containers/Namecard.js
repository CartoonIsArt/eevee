import React, { Component } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'

class Namecard extends Component {
  render() {
    let cwidth = '320px'
    const user = this.props.content
    if (this.props.width !== undefined) {
      cwidth = this.props.width
    }
    return (
      <div style={{ height: '418px', width: cwidth }}>
        <div style={{ height: '320px' }} >
          <a className="ant-anchor-link-title" href="#">
            <img width="100%" src={user.image.src} alt="profile" />
          </a>
        </div>
        <div style={{ height: '98px',
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          lineHeight: '1rem' }}
        >
          <div style={{ width: '67%', fontSize: '18pt', textAlign: 'left' }}>
            <div style={{ height: '34%', fontWeight: 'bold' }} >
              {user.last_name}
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {user.username}
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {user.department}
            </div>
          </div>
          <div style={{ width: '33%' }}>
            <Button> 프로필 수정 </Button>
          </div>
        </div>
      </div>
    )
  }
}

Namecard.propTypes = {
  content: PropTypes.object.isRequired,
  width: PropTypes.object.isRequired,
}

export default Namecard
