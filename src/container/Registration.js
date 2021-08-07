import React, { Component } from 'react'
import moment from 'moment'
import axios, { baseURL } from '../fetches/axios'
import club_rules from '../common/club_rules'
import privacy_policy from '../common/privacy_policy'
import majors from '../common/majors'
import {
  Alert,
  Button,
  Cascader, 
  Checkbox,
  Upload,
  message,
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

function beforeUpload(file) {
  const isImage = file.type === 'image/gif'
                  || file.type === 'image/png'
                  || file.type === 'image/jpeg'
                  || file.type === 'image/bmp'
                  || file.type === 'image/webp';
  if (!isImage) {
    message.error('이미지만 업로드 해주세요!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('10MB 넘으면 안되요!');
  }
  return isImage && isLt10M;
}

function isPermittedBirthdate(date) {
  const max_birthdate = moment().subtract(120, 'years')
  const min_birthdate = moment()

  return date
    && date.isBefore(max_birthdate)
    && date.isAfter(min_birthdate)
}

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      agreeLaw: false,
      agreeTerms: false,
      agreeAll: false,
      formData: {
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
      },
      previewVisible: false,
      fileList: [],
      response: '',
    };
    let isKeyBackspace = false
  }

  onChangeInput(e) {
    this.setState({ formData: e })
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
    // https://blog.itanoss.kr/ko/한글-유니코드-정리/
    if (/[^\uac00-\ud7a3]/.test(this.state.formData.name)) {
      return Modal.warning({ title: '이름을 확인해주세요!', content: '한글 이름만 사용 가능합니다.' })
    }
    if (this.state.formData.password !== this.state.formData.passwordCheck) {
      return Modal.warning({ title: '비밀번호를 확인해주세요!', content: '비밀번호 확인이 일치하지 않습니다.' });
    }
    // https://stackoverflow.com/questions/4374185/regular-expression-match-to-test-for-a-valid-year
    // https://stackoverflow.com/questions/1538512/how-can-i-invert-a-regular-expression-in-javascript
    if (/^(?!.*^[12][0-9]{3}\d{6}$)/.test(this.state.formData.studentNumber)) {
      return Modal.warning({ title: '학번을 확인해주세요!', content: '유효하지 않은 학번입니다.' })
    }
    // https://emailregex.com/
    if (/^(?!.*^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/.test(this.state.formData.email)) {
      return Modal.warning({ title: '이메일을 확인해주세요!', content: '유효하지 않은 이메일 주소입니다.' })
    }
    if (/^(?!.*^\d{3}[-]+\d{4}[-]+\d{4}$)/.test(this.state.formData.phoneNumber)) {
      return Modal.warning({ title: '전화번호를 확인해주세요!', content: '유효하지 않은 전화번호입니다.' })
    }

    axios.post('/public/user', this.state.formData)
      .then((r) => {
        this.setState({
          response: r,
        })
        Modal.success({
          favoriteComic: '가입 신청이 완료되었습니다!',
          content: '오늘 안으로 가입 승인이 완료될 거에요.',
          onOk() { location.href = '/login' },
        })
      })
      .catch((e) => {
        this.setState({
          response: e.response,
        })
        Modal.warning({ favoriteComic: '중복되는 ID입니다.', content: '중복되는 ID입니다.' })
      })
  }

  isEmpty() {
    return !(this.state.formData.username
            && this.state.formData.password
            && this.state.formData.studentNumber
            && this.state.formData.name
            && this.state.formData.nTh
            && this.state.formData.birthdate
            && this.state.formData.major
            && this.state.formData.email
            && this.state.formData.phoneNumber)
  }

  handleCancelProfile() {
    this.setState({ previewVisible: false })
  }

  handlePreview(file) {
    this.setState({
      formData: {
        profileImage: file.url || file.thumbUrl,
      },
      previewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList })
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div><p> 업로드 </p></div>
      </div>
    );

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
                      action={`${baseURL}/file`}
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
