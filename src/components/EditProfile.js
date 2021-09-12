import { Card, Icon, Modal, Upload } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { baseURL } from '../fetches/axios'

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
      <Card className="edit-profile-card">
        <Upload
          className="edit-profile-banner"
          accept=".jpg,.jpeg,.png,.gif"
          action={`${baseURL}/public/file`}
          name="avatar"
          listType="picture-card"
          fileList={bannerFileList}
          onPreview={handleBannerPreview}
          onChange={handleBannerChange}
        >
          {bannerFileList.length === 0 && uploadButton}
        </Upload>
        <Modal
          visible={previewBannerVisible}
          footer={null}
          onCancel={handleCancelBannerPreview}
        >
          <img
            style={{ width: '100%' }}
            alt="프로필 배너 이미지"
            src={profileBannerImage}
          />
        </Modal>
        <Upload
          className="edit-profile"
          accept=".jpg,.jpeg,.png,.gif"
          action={`${baseURL}/public/file`}
          name="avatar"
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length === 0 && uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={handleCancelPreview}
        >
          <img
            style={{ width: '100%' }}
            alt="프로필 이미지"
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
  