import { Alert, Button, Card, Cascader, Col, DatePicker, Input, message, Modal, Row } from 'antd'
import moment from 'moment'
import React, { Component } from 'react'
import club_rules from '../common/club_rules'
import majors from '../common/majors'
import privacy_policy from '../common/privacy_policy'
import SingleImageUploader from '../components/SingleImageUploader'
import TermAgreement from '../components/TermAgreement'
import axios from '../fetches/axios'
import {
  isHyphenPosition,
  isKoreanOnly,
  isPermittedBirthdate,
  isValidEmail,
  isValidPhoneNumber,
  isValidPhoneNumberOnTyping,
  isValidStudentNumber,
} from '../lib'


const nThs = (() => {
  const max = moment().get('year') - 1998
  let nThs = []
  for (let i = 1; i <= max; i += 1) {
    nThs.push({ value: i, label: `${i}기` });
  }
  return nThs
})()

const default_nTh = (() => {
  const today = new Date()
  return (today.getFullYear() - 1998)
})()
const default_birthdate = moment().subtract(19, 'years')

class Registration extends Component {
  state = {
    visible: false,
    agreeLaw: false,
    agreeTerms: false,
    agreeAll: false,
    username: '',
    password: '',
    passwordCheck: '',
    favoriteComic: '',
    favoriteCharacter: '',
    profileImage: '',
    studentNumber: '',
    name: '',
    nTh: default_nTh,
    birthdate: default_birthdate,
    major: '',
    email: '',
    phoneNumber: '',
    fileList: [],
    previewVisible: false,
  };
  isKeyBackspace = false

  handlePreview = (file) => {
    this.setState({
      profileImage: file.thumbUrl,
      previewVisible: true,
    });
  }

  handleCancelProfilePreview = () => {
    this.setState({ previewVisible: false });
  }

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      fileList[fileList.length - 1].thumbUrl = `/images/${file.response.avatar}`
      this.setState({ profileImage: `/images/${file.response.avatar}` })
    }
    else if (file.status === 'fail') {
      message.error('업로드 실패!')
    }
    this.setState({ fileList })
  }

  onNumberChange = (value) => {
    this.setState({ nTh: value[0] })
  }

  onDateChange = (_, dateString) => {
    this.setState({ birthdate: dateString })
  }

  onMajorChange = (value) => {
    this.setState({ major: value[1] })
  }

  onButtonClicked = () => {
    if (this.isEmpty()) {
      return Modal.warning({ title: '다시 확인해주세요!', content: '입력하지 않은 필수 항목이 있습니다.' });
    }
    // https://develop-im.tistory.com/21
    if (isKoreanOnly(this.state.name)) {
      return Modal.warning({ title: '이름을 확인해주세요!', content: '한글 이름만 사용 가능합니다.' })
    }
    if (this.state.password !== this.state.passwordCheck) {
      return Modal.warning({ title: '비밀번호를 확인해주세요!', content: '비밀번호 확인이 일치하지 않습니다.' });
    }
    // https://stackoverflow.com/questions/4374185/regular-expression-match-to-test-for-a-valid-year
    // https://stackoverflow.com/questions/1538512/how-can-i-invert-a-regular-expression-in-javascript
    if (isValidStudentNumber(this.state.studentNumber)) {
      return Modal.warning({ title: '학번을 확인해주세요!', content: '유효하지 않은 학번입니다.' })
    }
    // https://emailregex.com/
    if (isValidEmail(this.state.email)) {
      return Modal.warning({ title: '이메일을 확인해주세요!', content: '유효하지 않은 이메일 주소입니다.' })
    }
    if (isValidPhoneNumber(this.state.phoneNumber)) {
      return Modal.warning({ title: '전화번호를 확인해주세요!', content: '유효하지 않은 전화번호입니다.' })
    }

    const formData = {
      username: this.state.username,
      password: this.state.password,
      passwordCheck: this.state.passwordCheck,
      favoriteComic: this.state.favoriteComic,
      favoriteCharacter: this.state.favoriteCharacter,
      profileImage: this.state.profileImage,
      studentNumber: this.state.studentNumber,
      name: this.state.name,
      nTh: this.state.nTh,
      birthdate: moment(this.state.birthdate).format('YYYY-MM-DD'),
      major: this.state.major,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    }

  axios.post('/public/account', formData)
    .then(() => {
      Modal.success({
        title: '가입 신청이 완료되었습니다!',
        content: '오늘 안으로 가입 승인이 완료될 거에요.',
        onOk() { location.href = '/login' },
      })
    })
    .catch((e) => {
      const message = e.response.data
      Modal.warning({
        title: '입력 데이터를 확인해주세요!',
        content: `사용할 수 없는 값입니다: ${message.slice(16, message.indexOf("'", 17) + 1)}`,
      })
    })
  }

  isEmpty = () => !(
    this.state.username
    && this.state.password
    && this.state.studentNumber
    && this.state.name
    && this.state.nTh
    && this.state.birthdate
    && this.state.major
    && this.state.email
    && this.state.phoneNumber
  )

  onChangePhoneNumber = (phoneNumber) => {
    if (isValidPhoneNumberOnTyping(phoneNumber)) {
      return
    }
    if (this.isKeyBackspace && isHyphenPosition(phoneNumber)) {
      phoneNumber = phoneNumber.slice(0, -1)
    }
    if (!this.isKeyBackspace && isHyphenPosition(phoneNumber)) {
      phoneNumber = [
        phoneNumber.slice(0, phoneNumber.length - 1),
        phoneNumber.slice(phoneNumber.length - 1),
      ].join('-')
    }
    this.setState({ phoneNumber })
  }

  onKeyDownBackspace = (e) => {
    this.isKeyBackspace = (e.key === 'Backspace')
  }

  render() {
    const {
      agreeLaw, agreeTerms,
      username, password, passwordCheck,
      favoriteComic, favoriteCharacter, profileImage,
      studentNumber, name, email, phoneNumber, 
      fileList, previewVisible,
    } = this.state;

    if (!this.state.agreeAll)
      return (
        <Card>
          <Row type="flex" justify="end">
            <Col className="registration-term-agreement">
              <TermAgreement
                name="C.I.A. 회칙 동의 (필수)"
                text={club_rules}
                hasAgree={agreeLaw}
                agree={() => this.setState({ agreeLaw: !agreeLaw })}
              />
            </Col>
            <Col className="registration-term-agreement">
              <TermAgreement
                name="개인정보 수집 및 이용에 대한 안내 (필수)"
                text={privacy_policy}
                hasAgree={agreeTerms}
                agree={() => this.setState({ agreeTerms: !agreeTerms })}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                disabled={!agreeLaw || !agreeTerms}
                onClick={() => this.setState({ agreeAll: agreeLaw && agreeTerms })}
              >
                동의합니다
              </Button>
            </Col>
          </Row>
        </Card>
      )
    else
      return (
      <Card id="registration-card" title="CIA 회원가입">
        <Row type="flex" align="top" justify="center">
          <Col xs={0} lg={12}>
            <img
              id="registration-img"
              alt="회원가입 이미지"
              src="/images/registration_left_side.jpg"
            />
          </Col>
          <Col xs={24} lg={12}>
            <Row className="registration-row-group" type="flex" justify="center" gutter={[0, 20]}>
              <Col span={16} style={{ textAlign: 'center' }}>
                <Alert message="* 부분은 필수 입력사항입니다" type="warning" />
              </Col>
              <Col span={16}>
                <SingleImageUploader
                  className="registration-uploader"
                  fileList={fileList}
                  profileImage={profileImage}
                  previewVisible={previewVisible}
                  handlePreview={this.handlePreview}
                  handleCancelProfilePreview={this.handleCancelProfilePreview}
                  handleChange={this.handleChange}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 이름"
                  onChange={(e) => this.setState({ name: e.target.value })}
                  value={name}
                />
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={12}>
                    <Cascader
                      className="registration-cascader-picker"
                      placeholder="* 기수"
                      showSearch
                      options={nThs}
                      defaultValue={[default_nTh]}
                      onChange={this.onNumberChange}
                    />
                  </Col>
                  <Col span={12}>
                    <DatePicker
                      className="registration-calendar-picker"
                      placeholder="* 생일"
                      defaultValue={default_birthdate}
                      disabledDate={isPermittedBirthdate}
                      onChange={this.onDateChange}
                    />
                  </Col>
                </Row>
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 아이디"
                  onChange={(e) => this.setState({ username: e.target.value })}
                  value={username}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 비밀번호"
                  type="password"
                  onChange={(e) => this.setState({ password: e.target.value })}
                  value={password}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 비밀번호 확인"
                  type="password"
                  onChange={(e) => this.setState({ passwordCheck: e.target.value })}
                  value={passwordCheck}
                />
              </Col>
              <Col span={16}>
                <Cascader
                  className="registration-cascader-picker"
                  placeholder="* 전공"
                  options={majors}
                  onChange={this.onMajorChange}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 학번"
                  onChange={(e) => this.setState({ studentNumber: e.target.value })}
                  placeholder="ex) 2017000000"
                  value={studentNumber}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 이메일"
                  onChange={(e) => this.setState({ email: e.target.value })}
                  placeholder="ex) example@example.com"
                  value={email}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="* 전화번호"
                  onChange={(e) => this.onChangePhoneNumber(e.target.value)}
                  onKeyDown={this.onKeyDownBackspace}
                  placeholder="ex) 010-1234-5678"
                  value={phoneNumber}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="만화 제목"
                  onChange={(e) => this.setState({ favoriteComic: e.target.value })}
                  placeholder="ex) 하이큐"
                  value={favoriteComic}
                />
              </Col>
              <Col span={16}>
                <Input
                  className="registration-input"
                  addonBefore="캐릭터 이름"
                  onChange={(e) => this.setState({ favoriteCharacter: e.target.value })}
                  placeholder="ex) 카게야마 토비오"
                  value={favoriteCharacter}
                />
              </Col>
              <Col span={16}>
                <Button id="registration-button" type="primary" onClick={this.onButtonClicked}>
                  <span>환영해요!</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    )
  }
}

export default Registration
