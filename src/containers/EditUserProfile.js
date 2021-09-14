import {
  Button,
  Card,
  Cascader,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
} from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAccount, patchAccount } from '../actions'
import majors from '../common/majors'
import EditProfile from '../components/EditProfile'
import axios from '../fetches/axios'
import { isValidBirthdate } from '../lib'


const getDepartmentAndMajor = (major) => {
  if (!major) return []
  const department = majors.find(department => department.children.find(m => m.value === major) !== undefined)
  return [department.label, major];
}

class EditUserProfile extends Component {
  constructor(props) {
    super(props)

    const {
      email,
      birthdate,
      major,
      phoneNumber
    } = this.props.account.student

    const {
      favoriteComic,
      favoriteCharacter,
      profileImage,
      profileBannerImage
    } = this.props.account.profile
    
    this.state = {
      hasPasswordChecked: false,
      checkPassword: '',
      id: '', 
      email,
      birthdate,
      major,
      phoneNumber,
      favoriteComic,
      favoriteCharacter,
      profileImage,
      profileBannerImage,
      fileList: [{ uid: -1, name: profileImage, status: 'done', thumbUrl: profileImage }],
      bannerFileList: [{ uid: -1, name: profileBannerImage, status: 'done', thumbUrl: profileBannerImage }],
      previewVisible: false,
      previewBannerVisible: false,
    };
  }

  onDateChange = (_, dateString) => {
    this.setState({ birthdate: dateString });
  }

  isEmpty = () => !(
    this.state.birthdate
    && this.state.major
    && this.state.email
    && this.state.phoneNumber
  )

  editProfile = () => {
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

    const {
      favoriteComic, favoriteCharacter, profileImage, profileBannerImage,
      email, birthdate, major, phoneNumber,
    } = this.state

    const formData = {
      id: this.props.account.id,
      profile: {
        favoriteComic,
        favoriteCharacter,
        profileImage,
        profileBannerImage,
      },
      student: {
        email,
        birthdate,
        major,
        phoneNumber,
      }
    }

    this.props.patchAccount(formData)
      .then(() => {
        message.success('회원 정보가 수정되었습니다!')
        this.props.history.goBack()
      })
      .catch((e) => {
        message.error(`회원 정보 수정에 실패했습니다: ${e.message}`)
      })
    this.setState({ visible: false });
  }

  handlePreview = (file) => {
    this.setState({
      profileImage: file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancelPreview = () => {
    this.setState({ previewVisible: false });
  }

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      fileList[fileList.length - 1].thumbUrl =  `/images/${file.response.avatar}`
      this.setState({ profileImage: `/images/${file.response.avatar}` })
    }
    else if (file.status === 'error') {
      switch (file.error.status) {
      case 400:
        message.error(file.response)
        break
      case 413:
        message.error('파일은 10MB까지에요!')
        break
      default:
        message.error(`${file.error.status} 에러: 관리자에게 문의해주세요.`)
        break
      }
    }
    this.setState({ fileList })
  }

  handleBannerPreview = (file) => {
    this.setState({
      profileImage: file.thumbUrl,
      previewBannerVisible: true,
    });
  }

  handleCancelBannerPreview = () => {
    this.setState({ previewBannerVisible: false });
  }
  

  handleBannerChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      fileList[fileList.length - 1].thumbUrl =  `/images/${file.response.avatar}`
      this.setState({ profileBannerImage: `/images/${file.response.avatar}` })
    }
    this.setState({ bannerFileList: fileList })
  }

  onMajorChange = (value) => {
    this.setState({ major: value[1] })
  }

  onChangePhoneNumber = (phoneNumber) => {
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

  onKeyDownBackspace = ({ key }) => {
    this.isKeyBackspace = (key === 'Backspace')
  }

  checkPassword = () => {
    const formData = {
      password: this.state.checkPassword,
    }

    axios.post('/account/checkPassword', formData)
      .then(() => {
        this.setState({ hasPasswordChecked: true })
      })
      .catch(() => {
        this.setState({ checkPassword: '' })
        Modal.warning({ title: '비밀번호가 틀립니다.', content: '비밀번호를 확인해주세요.' })
      })
  }

  cancelEdit = () => {
    this.props.history.goBack()
  }

  render() {
    const {
      checkPassword, hasPasswordChecked,
      email, phoneNumber, favoriteComic, favoriteCharacter, major,
      profileImage, profileBannerImage, fileList, bannerFileList, birthdate, previewVisible, previewBannerVisible
    } = this.state;

    return (
      <Card className="page-card" title="프로필 수정">
        <Modal
          title="프로필 수정"
          closable={false}
          visible={!hasPasswordChecked}
          onOk={this.checkPassword}
          onCancel={this.cancelEdit}
          okText="확인"
          cancelText="돌아가기"
        >
          <Form layout="inline">
            <Form.Item rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}>
              비밀번호 확인
              <Input 
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Password"
                value={checkPassword}
                onChange={(e) => this.setState({ checkPassword: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Row className="edit-profile-row">
          <EditProfile
            fileList={fileList}
            profileImage={profileImage}
            previewVisible={previewVisible}
            handlePreview={this.handlePreview}
            handleCancelPreview={this.handleCancelPreview}
            handleChange={this.handleChange}
            bannerFileList={bannerFileList}
            profileBannerImage={profileBannerImage}
            previewBannerVisible={previewBannerVisible}
            handleBannerPreview={this.handleBannerPreview}
            handleCancelBannerPreview={this.handleCancelBannerPreview}
            handleBannerChange={this.handleBannerChange}
          />
        </Row>
        <Row className="edit-row-group" type="flex" justify="center" gutter={[12, 8]}>
          <Col xs={24} lg={12}>
            <Row type="flex" justify="center" gutter={[12, 8]}>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="이메일"
                  size="large"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  placeholder="ex) example@example.com"
                  value={email}
                />
              </Col>
              <Col span={18}>
                <DatePicker
                  className="input-calendar-picker"
                  size="large"
                  defaultValue={moment(birthdate)}
                  onChange={this.onDateChange}
                  placeholder="생일"
                  disabledDate={isValidBirthdate}
                />
              </Col>
              <Col span={18}>
                <Cascader
                  className="input-cascader-picker"
                  size="large"
                  options={majors}
                  defaultValue={getDepartmentAndMajor(major)}
                  onChange={this.onMajorChange}
                  placeholder="전공"
                />
              </Col>
            </Row>
          </Col>
          <Col className="edit-col-group" xs={24} lg={12}>
            <Row type="flex" justify="center" gutter={[12, 8]}>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="전화번호"
                  size="large"
                  onChange={(e) => this.onChangePhoneNumber(e.target.value)}
                  onKeyDown={this.onKeyDownBackspace}
                  placeholder="ex) 010-1234-1234"
                  value={phoneNumber}
                />
              </Col>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="만화 제목"
                  size="large"
                  onChange={(e) => this.setState({ favoriteComic: e.target.value })}
                  placeholder="ex) 하이큐"
                  value={favoriteComic}
                />
              </Col>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="캐릭터 이름"
                  size="large"
                  onChange={(e) => this.setState({ favoriteCharacter: e.target.value })}
                  placeholder="ex) 카게야마 토비오"
                  value={favoriteCharacter}
                />
              </Col>
              <Col span={18}>
                <Row type="flex" justify="end">
                  <Col span={5}>
                    <Popconfirm
                      title="정말 수정하시겠습니까?"
                      onConfirm={this.editProfile}
                      okText="수정하기"
                      cancelText="취소"
                    >
                      <Button type="primary">수정하기</Button>
                    </Popconfirm>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    );
  }
}

EditUserProfile.propTypes = {
  history: PropTypes.object.isRequired,
  footer: PropTypes.element,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
  patchAccount,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserProfile))
