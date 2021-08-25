import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Icon,
  Input,
  Modal,
  Row,
  Upload,
} from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAccount } from '../actions'
import majors from '../common/majors'
import axios, { baseURL } from '../fetches/axios'
import { beforeUpload, isPermittedBirthdate } from '../lib'


function getDepartmentAndMajor(major) {
  const department = majors.find(department => department.children.find(m => m.value === major) !== undefined)
  return [department.label, major];
}

class EditUserProfile extends Component {
  constructor(props) {
    super(props)
    this.props.getAccount()
    this.state = {
      visible: false,
      bVisible: false,
      id: '', 
      email: this.props.account.student.email,
      birthdate: this.props.account.student.birthdate,
      major: this.props.account.student.major,
      phoneNumber: this.props.account.student.phoneNumber,
      favoriteComic: this.props.account.profile.favoriteComic,
      favoriteCharacter: this.props.account.profile.favoriteCharacter,
      profileImage: this.props.account.profile.profileImage,
      profileBannerImage: this.props.account.profile.profileBannerImage,
      previewVisible: false,
      bannerPreviewVisible: false,
      fileList: [{ uid: -1, name: this.props.account.profile.profileImage, status: 'done', url: this.props.account.profile.profileImage }],
      bannerFileList: [{ uid: -1, name: this.props.account.profile.profileBannerImage, status: 'done', url: this.props.account.profile.profileBannerImage }],
    };
  }

  onDateChange(_, dateString) {
    this.setState({ birthdate: dateString });
  }

  onChangeInput(e) {
    this.setState(e);
  }

  isEmpty() {
    return !(this.state.birthdate
            && this.state.major
            && this.state.email
            && this.state.phoneNumber)
  }

  handleOk() {
    if (this.isEmpty()) {
      return Modal.warning({ title: '다시 확인해주세요!', content: '입력하지 않은 필수 항목이 있습니다.' });
    }
    // https://emailregex.com/
    if (/^(?!.*^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/.test(this.state.email)) {
      return Modal.warning({ title: '이메일을 확인해주세요!', content: '유효하지 않은 이메일 주소입니다.' })
    }
    if (/^(?!.*^\d{3}[-]+\d{4}[-]+\d{4}$)/.test(this.state.phoneNumber)) {
      return Modal.warning({ title: '전화번호를 확인해주세요!', content: '유효하지 않은 전화번호입니다.' })
    }

    const formData = {
      profile: {
        favoriteComic: this.state.favoriteComic,
        favoriteCharacter: this.state.favoriteCharacter,
        profileImage: this.state.profileImage,
        profileBannerImage: this.state.profileBannerImage,
      },
      student: {
        email: this.state.email,
        birthdate: this.state.birthdate,
        major: this.state.major,
        phoneNumber: this.state.phoneNumber,
      }
    }

    axios.patch(`/account/${this.props.account.id}`, formData)
      .then(() => {
        const username = this.props.account.username
        Modal.success({
          title: '회원 정보 수정이 완료되었습니다!',
          content: '확인 버튼을 누르면 마이 페이지로 돌아갑니다.',
          onOk() { location.href = `/members/${username}` },
        })
      })
      .catch(() => {
        Modal.warning({
          title: '회원 정보 수정에 실패했습니다.',
          content: '입력 정보를 확인해주세요.'
        })
      })
    this.setState({ visible: false });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  showModal() {
    this.setState({ visible: true });
  }

  handleBannerCancel() {
    this.setState({ bVisible: false });
  }

  showBannerModal(){
    this.setState({ bVisible: true })
  }

  handleCancelProfile() {
    this.setState({ previewVisible: false })
  }

  handleCancelBanner(){
    this.setState({ bannerPreviewVisible: false })
  }

  handlePreview(file) {
    this.setState({
      profileImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleBannerPreview(file) {
    this.setState({
      profileBannerImage: file.url || file.thumbUrl,
      bannerPreviewVisible: true,
    });
  }

  handleChange({ file, fileList }) {
    if (file.status === 'done') {
      this.setState({ profileImage: file.response.avatar })
    }
    this.setState({ fileList })
  }

  handleBannerChange({ file, fileList }) {
    if (file.status === 'done') {
      this.setState({ profileBannerImage: file.response.avatar })
    }
    this.setState({ bannerFileList: fileList })
  }

  onMajorChange(value) {
    this.setState({ major: value[1] })
  }

  onChangePhoneNumber(phoneNumber) {
    if (/(?![0-9-]{0,13}$)/.test(phoneNumber)) {
      return
    }
    if (this.isKeyBackspace
        && (phoneNumber.length == 4 || phoneNumber.length == 9)) {
      phoneNumber = phoneNumber.slice(0, -1)
    }
    if (!this.isKeyBackspace
        && (phoneNumber.length == 4 || phoneNumber.length == 9)) {
      phoneNumber = [
        phoneNumber.slice(0, phoneNumber.length - 1),
        phoneNumber.slice(phoneNumber.length - 1),
      ].join('-')
    }
    this.setState({ phoneNumber })
  }

  onKeyDownBackspace(e) {
    this.isKeyBackspace = (e.key === 'Backspace')
  }

  render() {
    const {
      email, phoneNumber, favoriteComic, favoriteCharacter, major,
      previewVisible, bannerPreviewVisible, profileImage, profileBannerImage, fileList, bannerFileList, birthdate
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div><p> 업로드 </p></div>
      </div>
    );

    return (
      <div style={{
        width: '100%',
        background: '#ffffff',
        marginLeft: '8px',
        marginTop: '8px',
        display: 'flex',
        flexDrection: 'column',
        flexWrap: 'wrap',
      }}
      >
        <h1 style={{ margin: '12px 0px 12px 12px' }}> 프로필 수정 </h1>
        <div className="header">
          <div className="background-image">
            <div className="user-banner">
              <Upload
                name="avatar"
                action={`${baseURL}/public/file`}
                listType="picture-card"
                fileList={bannerFileList}
                onPreview={(e) => this.handleBannerPreview(e)}
                onChange={(e) => this.handleBannerChange(e)}
                beforeUpload={(e) => beforeUpload(e)}
              >
                {bannerFileList.length ? null : uploadButton}
              </Upload>
              <Modal
                visible={bannerPreviewVisible}
                footer={null}
                onCancel={() => this.handleCancelBanner()}
              >
                <img
                  alt="프로필 이미지"
                  style={{ width: '100%' }}
                  src={profileBannerImage}
                />
              </Modal>
            </div>
            <div className="user-profile">
              <Upload
                name="avatar"
                action={`${baseURL}/public/file`}
                listType="picture-card"
                fileList={fileList}
                onPreview={(e) => this.handlePreview(e)}
                onChange={(e) => this.handleChange(e)}
                beforeUpload={(e) => beforeUpload(e)}
              >
                {fileList.length ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={() => this.handleCancelProfile()}
              >
                <img
                  alt="프로필 이미지"
                  style={{ width: '100%' }}
                  src={profileImage}
                />
              </Modal>
            </div>
          </div>
          <div className="menu-bar"/>
        </div>
        <div className="input">
          <Row style={{ margin: "0px 5% 0px 5%" }}>
            <Col span={12}>
              <Input
                addonBefore="*이메일"
                size="large"
                style={{ width: '90%', marginBottom: '16px' }}
                onChange={(e) => this.onChangeInput({ email: e.target.value })}
                placeholder="ex) example@example.com"
                value={email}
              />
              <DatePicker
                size="large"
                style={{ width: '90%', marginBottom: '16px' }}
                defaultValue={moment(birthdate)}
                onChange={(_, dateString) => this.onDateChange(_, dateString)}
                placeholder="*생일을 선택하세요"
                disabledDate={(currentDate) => { isPermittedBirthdate(currentDate) }}
              />
              <Cascader
                //defaultValue={[major]} DB를 수정하고 수정
                size="large"
                style={{ width: '90%', marginBottom: '16px' }}
                options={majors}
                defaultValue={getDepartmentAndMajor(major)}
                onChange={(value) => this.onMajorChange(value)}
                placeholder="*전공"
              />
            </Col>
            <Col span={12}>
              <Input
                addonBefore="*전화번호"
                size="large"
                style={{ width: '90%', marginBottom: '16px', marginLeft: '10%' }}
                onChange={(e) => this.onChangePhoneNumber(e.target.value)}
                onKeyDown={(e) => this.onKeyDownBackspace(e)}
                placeholder="ex) 010-1234-1234"
                value={phoneNumber}
              />
              <Input
                addonBefore="만화 제목"
                size="large"
                style={{ width: '90%', marginBottom: '16px', marginLeft: '10%' }}
                onChange={(e) => this.onChangeInput({ favoriteComic: e.target.value })}
                placeholder="ex) 하이큐"
                value={favoriteComic}
              />
              <Input
                addonBefore="캐릭터 이름"
                size="large"
                style={{ width: '90%', marginBottom: '16px', marginLeft: '10%' }}
                onChange={(e) => this.onChangeInput({ favoriteCharacter: e.target.value })}
                placeholder="ex) 카게야마 토비오"
                value={favoriteCharacter}
              />
              <div style={{
                marginTop: '16px',
                marginLeft: 'auto',
                marginRight: '5%',
                width: '42px',
              }}
              >
                <Button type="primary" onClick={() => this.showModal()}> 저장 </Button>
                <Modal
                  visible={this.state.visible}
                  onOk={() => this.handleOk()}
                  onCancel={() => this.handleCancel()}
                >
                  <h1>정말 수정하시겠습니까?</h1>
                </Modal>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)
