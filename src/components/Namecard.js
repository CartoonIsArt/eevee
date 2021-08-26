import { Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NameTag from './NameTag'


class Namecard extends Component {
  render() {
    const { account, size } = this.props
    
    return (
      <div style={{ width: size }}>
        <a className="ant-anchor-link-title" style={{ height: size }} href="#">
          <img id="img-namecard" width="100%" src={account.profile.profileImage} alt={account.profile.profileImage} />
        </a>
        <Row
         type="flex" align="middle"
          style={{
            height: '98px',
            display: 'flex',
            flexDirection: 'row',
            padding: '16px',
            lineHeight: '1.6rem',
          }}
        >
          <div style={{ fontSize: '18pt', textAlign: 'left' }}>
            <Row type="flex" align="middle" style={{ fontWeight: 'bold' }}>
              <Col>
                <NameTag account={account} />
              </Col>
            </Row>
            <Row style={{ marginTop: '1.6rem', fontSize: '14pt' }}>
              <Col>
                <span>{account.student.major}</span>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    )
  }
}

Namecard.propTypes = {
  account: PropTypes.object.isRequired,
  size: PropTypes.string,
}

Namecard.defaultProps = {
  size: '320px',
}

export default Namecard
