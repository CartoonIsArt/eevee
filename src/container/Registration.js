import React, { Component } from 'react'
import moment from 'moment'
import axios, { baseURL } from '../fetches/axios'
import club_rules from '../common/club_rules'
import privacy_policy from '../common/privacy_policy'
import majors from '../common/majors'
import {
  beforeUpload,
  isValidEmail,
  isHyphenPosition,
  isKoreanOnly,
  isPermittedBirthdate,
  isValidPhoneNumber,
  isValidPhoneNumberOnTyping,
  isValidStudentNumber,
} from '../lib'
import {
  Alert,
  Button,
  Cascader, 
  Checkbox,
  Upload,
  DatePicker,
  Form,
  Icon,
  Modal,
  Input
} from 'antd'

const FormItem = Form.Item;

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

const uploadButton = (
  <div>
    <Icon type="plus" />
    <div><p> 업로드 </p></div>
  </div>
);

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      previewVisible: false,
      fileList: [],
    };
    let isKeyBackspace = false
  }

  onChangeInput(e) {
    this.setState(e)
  }

  onNumberChange(value) {
    this.onChangeInput({ nTh: value[0] })
  }

  onDateChange(_, dateString) {
    this.onChangeInput({ birthdate: dateString })
  }

  onMajorChange(value) {
    this.onChangeInput({ major: value[1] })
  }

  onButtonClicked() {
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

  isEmpty() {
    return !(this.state.username
            && this.state.password
            && this.state.studentNumber
            && this.state.name
            && this.state.nTh
            && this.state.birthdate
            && this.state.major
            && this.state.email
            && this.state.phoneNumber)
  }

  handleCancelProfile() {
    this.setState({ previewVisible: false })
  }

  handlePreview(file) {
    this.setState({
      profileImage: file.thumbUrl || file.url,
      previewVisible: true,
    });
  }

  handleChange({ file, fileList }) {
    if (file.status === 'done') {
      this.setState({ profileImage: file.response.avatar })
    }
    this.setState({ fileList })
  }

  onChangePhoneNumber(phoneNumber) {
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
    this.onChangeInput({ phoneNumber })
  }

  onKeyDownBackspace(e) {
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
    
    return (
      this.state.agreeAll
        ? (
          <div style={{ width: '1280px' }}>
            <div style={{ display: 'flex', marginLeft: '220px' }}>
              <div style={{ width: '512px', marginRight: '40px' }}>
                <div
                  style={{ display: 'flex', marginBottom: '20px' }}
                >
                  <div style={{
                    width: '512px',
                    height: '80px',
                    padding: '10px',
                    paddingLeft: '32px',
                    fontSize: '40px',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                  }}
                  >
                    CIA 회원가입
                  </div>
                </div>
                <img
                  src="/images/registration_left_side.jpg"
                  alt="가로로 긴 그림"
                  style={{ width: '512px', overflow: 'hidden' }}
                />
              </div>
              <div style={{ width: '288px', marginTop: '20px' }}>
                <Alert message="* 부분은 필수 입력사항입니다" type="warning" />
                <Form style={{ marginTop: '20px' }}>
                  <FormItem label="프로필 사진">
                    <div style={{ marginTop: '8px' }}>
                      <div>
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
                  </FormItem>
                </Form>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  <Input
                    addonBefore="*이름"
                    size="large"
                    style={{ width: '288px', marginRight: '20px' }}
                    onChange={(e) => this.onChangeInput({ name: e.target.value })}
                    value={name}
                  />
                </div>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                  <div>
                    <Cascader
                      style={{ width: '140px', marginRight: '8px' }}
                      options={nThs}
                      size="large"
                      onChange={(value, option) => this.onNumberChange(value, option)}
                      placeholder="*기수를 선택하세요"
                      defaultValue={[default_nTh]}
                      showSearch
                    />
                    <DatePicker
                      style={{ width: '140px' }}
                      size="large"
                      onChange={(date, dateString) => this.onDateChange(date, dateString)}
                      placeholder="*생일을 선택하세요"
                      defaultValue={default_birthdate}
                      disabledDate={(currentDate) => { isPermittedBirthdate(currentDate) }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  <Input
                    addonBefore="*아이디"
                    size="large"
                    style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                    onChange={(e) => this.onChangeInput({ username: e.target.value })}
                    value={username}
                  />
                  <Input
                    addonBefore="*비밀번호"
                    type="password"
                    size="large"
                    style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                    onChange={(e) => this.onChangeInput({ password: e.target.value })}
                    value={password}
                  />
                  <Input
                    addonBefore="*비밀번호 확인"
                    type="password"
                    size="large"
                    style={{ width: '288px' }}
                    onChange={(e) => this.onChangeInput({ passwordCheck: e.target.value })}
                    value={passwordCheck}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  <Cascader
                    style={{ width: '288px', marginBottom: '8px' }}
                    options={majors}
                    size="large"
                    onChange={(value) => this.onMajorChange(value)}
                    placeholder="*전공"
                  />
                  <Input
                    addonBefore="*학번"
                    size="large"
                    style={{ width: '288px' }}
                    onChange={(e) => this.onChangeInput({ studentNumber: e.target.value })}
                    placeholder="ex) 2017000000"
                    value={studentNumber}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  <Input
                    addonBefore="*이메일"
                    size="large"
                    style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                    onChange={(e) => this.onChangeInput({ email: e.target.value })}
                    placeholder="ex) example@example.com"
                    value={email}
                  />
                  <Input
                    addonBefore="*전화번호"
                    size="large"
                    style={{ width: '288px' }}
                    onChange={(e) => this.onChangePhoneNumber(e.target.value)}
                    onKeyDown={(e) => this.onKeyDownBackspace(e)}
                    placeholder="ex) 010-1234-5678"
                    value={phoneNumber}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                  <div style={{ display: 'flex' }}>
                    <div style={{ width: '288px', display: 'flex', flexDirection: 'column' }}>
                      <Input
                        addonBefore="만화 제목"
                        size="large"
                        style={{ width: '288px', marginBottom: '8px' }}
                        onChange={(e) => this.onChangeInput({ favoriteComic: e.target.value })}
                        placeholder="ex) 하이큐"
                        value={favoriteComic}
                      />
                      <Input
                        addonBefore="캐릭터 이름"
                        size="large"
                        style={{ width: '288px', marginBottom: '20px' }}
                        onChange={(e) => this.onChangeInput({ favoriteCharacter: e.target.value })}
                        placeholder="ex) 카게야마 토비오"
                        value={favoriteCharacter}
                      />
                      <Button
                        size="large"
                        type="primary"
                        onClick={() => this.onButtonClicked()}
                      >
                        환영해요!
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
        : (
          <div
            className="agree"
            style={{ margin: '8px 0 8px 0', padding: '12px', backgroundColor: '#ffffff' }}
          >
            <div
              className="agree-box"
              style={{
                padding: '12px',
                border: '1.5px solid black',
                borderRadius: '10px',
              }}
            >
              <Checkbox
                style={{ fontSize: '20px', fontWeight: 'bold' }}
                checked={this.state.agreeLaw}
                onChange={() => this.setState({ agreeLaw: (!agreeLaw) })}
                className="pt-large"
              >
                C.I.A. 회칙 동의 (필수)
              </Checkbox>
              <div
                className="agree-text"
                style={{
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-line',
                  overflowY: 'scroll',
                  height: '200px',
                }}
              >
                {club_rules}
              </div>
            </div>
            <div
              className="agree-box"
              style={{
                padding: '12px',
                border: '1.5px solid black',
                borderRadius: '10px',
                marginTop: '20px',
              }}
            >
              <Checkbox
                style={{ fontSize: '20px', fontWeight: 'bold' }}
                checked={this.state.agreeTerms}
                onChange={() => this.setState({ agreeTerms: (!agreeTerms) })}
                className="pt-large"
              >
                개인정보 수집 및 이용에 대한 안내 (필수)
              </Checkbox>
              <div className="agree-text">
                <div style={{
                  wordWrap: 'break-word',
                  whiteSpace: 'pre-line',
                  overflowY: 'scroll',
                  height: '200px',
                }}
                >
                  {privacy_policy}
                </div>
              </div>
            </div>
            <Button
              type="primary"
              className="pt-button pt-intent-success float-right"
              style={{ marginTop: '20px' }}
              onClick={() => this.state.agreeLaw
                            && this.state.agreeTerms
                            && this.setState({ agreeAll: true })
                            && console.log(this.state.agreeAll)}
              disabled={!(this.state.agreeLaw && this.state.agreeTerms)}
            >
              동의합니다
              <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
            </Button>
          </div>
        )
    )
  }
}

export default Registration
