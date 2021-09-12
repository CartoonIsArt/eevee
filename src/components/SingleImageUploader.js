import { Card, Col, Icon, Modal, Row, Upload } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { baseURL } from '../fetches/axios'


const uploadButton = (
  <div>
    <Icon type="plus" />
    <p><span>업로드</span></p>
  </div>
);

class SingleImageUploader extends Component {
  render() {
    const {
      fileList,
      profileImage,
      previewVisible,
      handlePreview,
      handleCancelProfilePreview,
      handleChange
    } = this.props

    return (
      <Card id="single-image-uploader-card" title="프로필 이미지" size="small">
        <Row type="flex" justify="center">
          <Col>
            <Upload
              className="registration-profile-upload"
              accept=".jpg,.jpeg,.png,.gif"
              action={`${baseURL}/public/file`}
              name="avatar"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={handleCancelProfilePreview}
            >
              <img
                alt="프로필 이미지"
                style={{ width: '100%' }}
                src={profileImage}
              />
            </Modal>
          </Col>
        </Row>
      </Card>
    )
  }
}

SingleImageUploader.propTypes = {
  fileList: PropTypes.array.isRequired,
  profileImage: PropTypes.string.isRequired,
  previewVisible: PropTypes.bool.isRequired,
  handlePreview: PropTypes.func.isRequired,
  handleCancelProfilePreview: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default SingleImageUploader
