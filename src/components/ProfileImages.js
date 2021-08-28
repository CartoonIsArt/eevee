import { Card, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'


class ProfileImages extends Component {
  render() {
    const { profile, footer } = this.props
    
    return (
      <Card id="profile-images-header">
        <Row>
          <div
            className="profile-banner-image"
            style={{ backgroundImage: `url(${profile.profileBannerImage})` }}
          >
            <div className="profile-image-wrapper">
              <img className="profile-image" src={profile.profileImage} alt="프로필 이미지" />
            </div>
          </div>
        </Row>
        <Row className="footer" type="flex" justify="end">
          {footer}
        </Row>
      </Card>
    )
  }
}

ProfileImages.propTypes = {
  profile: PropTypes.object.isRequired,
  footer: PropTypes.element,
}

ProfileImages.defaultProps = {
  footer: <div />
}

export default ProfileImages
