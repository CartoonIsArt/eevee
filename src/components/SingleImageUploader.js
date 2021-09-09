import { Card, Col, Icon, Modal, Row, Upload } from 'antd'
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

class SingleImageUploader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Card id="single-image-uploader-card" title="프로필 이미지" size="small">
        <Row type="flex" justify="center">
          <Col>
            <Upload
              className="registration-profile-upload"
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
              onCancel={this.props.handleCancelProfilePreview}
            >
              <img
                alt="프로필 이미지"
                style={{ width: '100%' }}
                src={this.props.profileImage}
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
  handlePreview: PropTypes.func.isRequired,
  handleCancelProfilePreview: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default SingleImageUploader
