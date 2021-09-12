import { Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import NameTag from './NameTag'


class Namecard extends Component {
  render() {
    const { account, size } = this.props

    return (
      <div style={{ width: size }}>
        <div id="namecard-image-container">
          <img id="img-namecard" alt="프로필 이미지" src={account.profile.profileImage} />
        </div>
        <Row type="flex" align="middle" className="namecard-content-container">
          <Col className="namecard-nametag-col" span={24}>
            <NameTag account={account} />
          </Col>
          <Col className="namecard-major-col" span={24}>
            <span>{account.student.major}</span>
          </Col>
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
