import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import NameTag from './NameTag'

class Namecard extends Component {

  render() {
    const { account, width } = this.props
    
    return (
      <div style={{ width }}>
        <a className="ant-anchor-link-title" href="#">
          <img width="100%" src={account.profile.profileImage} alt={account.profile.profileImage} />
        </a>
        <Row
         type="flex" align="middle"
          style={{
            height: '98px',
            display: 'flex',
            flexDirection: 'row',
            padding: '16px',
            lineHeight: '1rem',
          }}
        >
          <div style={{ fontSize: '18pt', textAlign: 'left' }}>
            <Row type="flex" align="middle" style={{ fontWeight: 'bold' }}>
              <Col>
                <NameTag account={account} />
              </Col>
            </Row>
            <Row style={{ marginTop: '1rem', fontSize: '14pt' }}>
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
  width: PropTypes.string,
}

Namecard.defaultProps = {
  width: '320px',
}

export default Namecard
