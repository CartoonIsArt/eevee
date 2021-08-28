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
  Row
} from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAccount } from '../actions'
import majors from '../common/majors'
import axios from '../fetches/axios'
import { isPermittedBirthdate } from '../lib'
import SingleImageUploader from '../components/SingleImageUploader'
import ProfileImages from '../components/ProfileImages'


function getDepartmentAndMajor(major) {
  const department = majors.find(department => department.children.find(m => m.value === major) !== undefined)
  return [department.label, major];
}

class EditUserProfile extends Component {
  constructor(props) {
    super(props)

    const { email, birthdate, major, phoneNumber } = this.props.account.student
    const { favoriteComic, favoriteCharacter, profileImage, profileBannerImage } = this.props.account.profile
    
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
      fileList: [{ uid: -1, name: profileImage, status: 'done', url: profileImage }],
      bannerFileList: [{ uid: -1, name: profileBannerImage, status: 'done', url: profileBannerImage }],
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

    axios.patch(`/account/${this.props.account.id}`, formData)
      .then(() => {
        const username = this.props.account.username
        message.success('회원 정보가 수정되었습니다!')
        this.props.history.push(`/members/${username}`)
      })
      .catch((e) => {
        message.error(`회원 정보 수정에 실패했습니다: ${e.message}`)
      })
    this.setState({ visible: false });
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
      email, phoneNumber, favoriteComic, favoriteCharacter, major,
      profileImage, profileBannerImage, fileList, bannerFileList, birthdate
    } = this.state;

    return (
      <Card className="page-card" title="프로필 수정">
        <Modal
          title="프로필 수정"
          closable={false}
          visible={!this.state.hasPasswordChecked}
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
                value={this.state.checkPassword}
                onChange={(e) => this.setState({ checkPassword: e.target.value })}
              />
            </Form.Item>
          </Form>
        </Modal>
        <Row>
          <Col>
            <ProfileImages profile={this.props.account.profile} />
            <div className="header">
              <div className="background-image">
                <Col span={12}>
                  <SingleImageUploader
                    className="user-banner"
                    fileList={bannerFileList}
                    profileImage={profileBannerImage}
                    handlePreview={(e) => this.handleBannerPreview(e)}
                    handleChange={(e) => this.handleBannerChange(e)}
                  />
                </Col>
                <Col span={12}>
                  <SingleImageUploader
                    className="user-profile"
                    fileList={fileList}
                    profileImage={profileImage}
                    handlePreview={(e) => this.handlePreview(e)}
                    handleChange={(e) => this.handleChange(e)}
                  />
                </Col>
              </div>
              <div className="menu-bar"/>
            </div>
          </Col>
        </Row>
        <Row id="edit-row-group" type="flex" justify="center" gutter={[12, 8]}>
          <Col xs={24} lg={12}>
            <Row type="flex" justify="center" gutter={[12, 8]}>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="이메일"
                  size="large"
                  onChange={(e) => this.onChangeInput({ email: e.target.value })}
                  placeholder="ex) example@example.com"
                  value={email}
                />
              </Col>
              <Col span={18}>
                <DatePicker
                  className="input-calendar-picker"
                  size="large"
                  defaultValue={moment(birthdate)}
                  onChange={(_, dateString) => this.onDateChange(_, dateString)}
                  placeholder="생일"
                  disabledDate={(currentDate) => { isPermittedBirthdate(currentDate) }}
                />
              </Col>
              <Col span={18}>
                <Cascader
                  className="input-cascader-picker"
                  size="large"
                  options={majors}
                  defaultValue={getDepartmentAndMajor(major)}
                  onChange={(value) => this.onMajorChange(value)}
                  placeholder="전공"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={24} lg={12}>
            <Row type="flex" justify="center" gutter={[12, 8]}>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="전화번호"
                  size="large"
                  onChange={(e) => this.onChangePhoneNumber(e.target.value)}
                  onKeyDown={(e) => this.onKeyDownBackspace(e)}
                  placeholder="ex) 010-1234-1234"
                  value={phoneNumber}
                />
              </Col>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="만화 제목"
                  size="large"
                  onChange={(e) => this.onChangeInput({ favoriteComic: e.target.value })}
                  placeholder="ex) 하이큐"
                  value={favoriteComic}
                />
              </Col>
              <Col span={18}>
                <Input
                  className="edit-input"
                  addonBefore="캐릭터 이름"
                  size="large"
                  onChange={(e) => this.onChangeInput({ favoriteCharacter: e.target.value })}
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
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditUserProfile))
