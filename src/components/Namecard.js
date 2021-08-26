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
        <Row type="flex" align="middle" className="namecard-content-container">
          <Row type="flex" align="middle" className="namecard-nametag-container">
            <Col>
              <NameTag account={account} />
            </Col>
          </Row>
          <Row className="namecard-marjor-container">
            <Col>
              <span>{account.student.major}</span>
            </Col>
          </Row>
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
