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
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card className="edit-profile-card-container">
        <Upload
          className="edit-profile-banner-upload"
          name="avatar"
          action={`${baseURL}/public/file`}
          listType="picture-card"
          fileList={this.props.bannerFileList}
          onPreview={this.props.handleBannerPreview}
          onChange={this.props.handleBannerChange}
          beforeUpload={beforeUpload}
        >
          {this.props.bannerFileList.length ? null : uploadButton}
        </Upload>
        <Modal
          visible={this.props.previewBannerVisible}
          footer={null}
          onCancel={this.props.handleCancelBannerPreview}
        >
          <img
            alt="프로필 이미지"
            style={{ width: '100%' }}
            src={this.props.profileBannerImage}
          />
        </Modal>
        <Upload
          className="edit-profile-upload"
          style={{ zIndex:"1" }}
          name="avatar"
          action={`${baseURL}/public/file`}
          listType="picture-card"
          fileList={this.props.fileList}
          onPreview={this.props.handlePreview}
          onChange={this.props.handleChange}
          beforeUpload={beforeUpload}
        >
          {this.props.fileList.length ? null : uploadButton}
        </Upload>
        <Modal
          visible={this.props.previewVisible}
          footer={null}
          onCancel={this.props.handleCancelPreview}
        >
          <img
            alt="프로필 이미지"
            style={{ width: '100%' }}
            src={this.props.profileImage}
          />
        </Modal>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  fileList: PropTypes.array.isRequired,
  profileImage: PropTypes.string.isRequired,
  handlePreview: PropTypes.func.isRequired,
  handleCancelPreview: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  
  bannerFileList: PropTypes.array.isRequired,
  profileBannerImage: PropTypes.string.isRequired,
  handleBannerPreview: PropTypes.func.isRequired,
  handleCancelBannerPreview: PropTypes.func.isRequired,
  handleBannerChange: PropTypes.func.isRequired,
}

export default EditProfile
  