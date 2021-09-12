import { Card, Icon, Modal, Upload } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { baseURL } from '../fetches/axios'
import { beforeUpload } from '../lib'

const uploadButton = (
  <div>
    <Icon type="plus" />
    <p><span>업로드</span></p>
  </div>
);

class EditProfile extends Component {
  render() {
    const {
      fileList,
      profileImage,
      previewVisible,
      handlePreview,
      handleCancelPreview,
      handleChange,
      bannerFileList,
      profileBannerImage,
      previewBannerVisible,
      handleBannerPreview,
      handleCancelBannerPreview,
      handleBannerChange
    } = this.props

    return (
      <Card className="edit-profile-card-container">
        <Upload
          className="edit-profile-banner-upload"
          name="avatar"
          action={`${baseURL}/public/file`}
          listType="picture-card"
          fileList={bannerFileList}
          onPreview={handleBannerPreview}
          onChange={handleBannerChange}
          beforeUpload={beforeUpload}
        >
          {bannerFileList.length ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewBannerVisible}
          footer={null}
          onCancel={handleCancelBannerPreview}
        >
          <img
            alt="프로필 배너 이미지"
            style={{ width: '100%' }}
            src={profileBannerImage}
          />
        </Modal>
        <Upload
          className="edit-profile-upload"
          style={{ zIndex:"1" }}
          name="avatar"
          action={`${baseURL}/public/file`}
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
        >
          {fileList.length ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={handleCancelPreview}
        >
          <img
            alt="프로필 이미지"
            style={{ width: '100%' }}
            src={profileImage}
          />
        </Modal>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  fileList: PropTypes.array.isRequired,
  profileImage: PropTypes.string.isRequired,
  previewVisible: PropTypes.bool.isRequired,
  handlePreview: PropTypes.func.isRequired,
  handleCancelPreview: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  bannerFileList: PropTypes.array.isRequired,
  profileBannerImage: PropTypes.string.isRequired,
  previewBannerVisible: PropTypes.bool.isRequired,
  handleBannerPreview: PropTypes.func.isRequired,
  handleCancelBannerPreview: PropTypes.func.isRequired,
  handleBannerChange: PropTypes.func.isRequired,
}

export default EditProfile
  