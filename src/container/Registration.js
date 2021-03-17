import React, { Children, Component } from 'react'
import moment from 'moment'
import koKR from 'antd/lib/locale-provider/ko_KR'
import axios from '../fetches/axios'
import club_rules from '../terms/club_rules'
import privacy_policy from '../terms/privacy_policy'

const Alert = require('antd/lib/alert')
const Cascader = require('antd/lib/cascader')
const Checkbox = require('antd/lib/checkbox')
const Upload = require('antd/lib/upload')
const message = require('antd/lib/message')
const DatePicker = require('antd/lib/date-picker')
const LocaleProvider = require('antd/lib/locale-provider')
const Form = require('antd/lib/form')
const Button = require('antd/lib/button')
const Icon = require('antd/lib/icon')
const Modal = require('antd/lib/modal')
const Input = require('antd/lib/input')

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

const majors = [{
    label: '전자정보공과대학',
    value: '전자정보공과대학',
    children: [
      { label: '전자공학과', value: '전자공학과' },
      { label: '전자통신공학과', value: '전자통신공학과' },
      { label: '전기공학과', value: '전기공학과' },
      { label: '전자융합공학과', value: '전자융합공학과' },
      { label: '전자재료공학과', value: '전자재료공학과' },
      { label: '로봇학부', value: '로봇학부' },
    ]
  }, {
    label: '소프트웨어융합대학',
    value: '소프트웨어융합대학',
    children: [
      { label: '소프트웨어학부', value: '소프트웨어학부' },
      { label: '컴퓨터정보공학부', value: '컴퓨터정보공학부' },
      { label: '정보융합학부', value: '정보융합학부' },
    ]
  }, {
    label: '공과대학',
    value: '공과대학',
    children: [
      { label: '건축공학과', value: '건축공학과' },
      { label: '환경공학과', value: '환경공학과' },
      { label: '화학공학과', value: '화학공학과' },
      { label: '건축학과', value: '건축학과' },
    ]
  }, {
    label: '자연과학대학',
    value: '자연과학대학',
    children: [
      { label: '수학과', value: '수학과' },
      { label: '화학과', value: '화학과' },
      { label: '전자바이오물리학과', value: '전자바이오물리학과' },
      { label: '스포츠융합과학과', value: '스포츠융합과학과' },
      { label: '정보콘텐츠학과(야)', value: '정보콘텐츠학과(야)' },
    ]
  }, {
    label: '인문사회과학대학',
    value: '인문사회과학대학',
    children: [
      { label: '국어국문학과', value: '국어국문학과' },
      { label: '영어산업학과', value: '영어산업학과' },
      { label: '미디어커뮤니케이션학부', value: '미디어커뮤니케이션학부' },
      { label: '산업심리학과', value: '산업심리학과' },
      { label: '동북아문화산업학부', value: '동북아문화산업학부' },
    ]
  }, {
    label: '정책법학대학',
    value: '정책법학대학',
    children: [
      { label: '행정학과', value: '행정학과' },
      { label: '법학부', value: '법학부' },
      { label: '국제학부', value: '국제학부' },
      { label: '자산관리학과(야)', value: '자산관리학과(야)' },
    ]
  }, {
    label: '경영대학',
    value: '경영대학',
    children: [
      { label: '경영학부', value: '경영학부' },
      { label: '국제통상학부', value: '국제통상학부' },
    ]
  }
]

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
      fullname: '',
      nTh: default_nTh,
      birthdate: default_birthdate,
      id: '',
      password: '',
      passwordCheck: '',
      major: '',
      studentNumber: '',
      email: '',
      phoneNumber: '',
      favoriteComic: '',
      favoriteCharacter: '',
      profile: 'https://pbs.twimg.com/media/DLJeodaVoAAIkUU.jpg',
      previewVisible: false,
      fileList: [],
      response: '',
    };
    let isKeyBackspace = false
  }

  onChangeInput(e) {
    this.setState(e);
  }

  onNumberChange(value, selectedOption) {
    this.setState({ nTh: value[0] });
  }

  onDateChange(date, dateString) {
    this.setState({ birthdate: dateString });
  }

  onMajorChange(value, selectedOption) {
    this.setState({ major: value[1] })
  }

  onButtonClicked() {
    if (this.isEmpty()) {
      return Modal.warning({ title: '다시 확인해주세요!', content: '입력하지 않은 필수 항목이 있습니다.' });
    }
    // https://blog.itanoss.kr/ko/한글-유니코드-정리/
    if (/[^\uac00-\ud7a3]/.test(this.state.fullname)) {
      return Modal.warning({ title: '이름을 확인해주세요!', content: '한글 이름만 사용 가능합니다.' })
    }
    if (this.state.password !== this.state.passwordCheck) {
      return Modal.warning({ title: '비밀번호를 확인해주세요!', content: '비밀번호 확인이 일치하지 않습니다.' });
    }
    // https://stackoverflow.com/questions/4374185/regular-expression-match-to-test-for-a-valid-year
    // https://stackoverflow.com/questions/1538512/how-can-i-invert-a-regular-expression-in-javascript
    if (/^(?!.*^[12][0-9]{3}\d{6}$)/.test(this.state.studentNumber)) {
      return Modal.warning({ title: '학번을 확인해주세요!', content: '유효하지 않은 학번입니다.' })
    }
    // https://emailregex.com/
    if (/^(?!.*^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$).*/.test(this.state.email)) {
      return Modal.warning({ title: '이메일을 확인해주세요!', content: '유효하지 않은 이메일 주소입니다.' })
    }
    if (/^(?!.*^\d{3}[-]+\d{4}[-]+\d{4}$)/.test(this.state.phoneNumber)) {
      return Modal.warning({ title: '전화번호를 확인해주세요!', content: '유효하지 않은 전화번호입니다.' })
    }

    const user = {
      fullname: this.state.fullname,
      nTh: this.state.nTh,
      birthdate: this.state.birthdate,
      username: this.state.id,
      password: this.state.password,
      major: this.state.major,
      studentNumber: this.state.studentNumber,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      favoriteComic: this.state.favoriteComic,
      favoriteCharacter: this.state.favoriteCharacter,
      profileImage: this.state.fileList.length < 1 ? 'default' : this.state.fileList[0].name,
    }
    axios.post('/public/user', user)
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
    return !(this.state.fullname
            && this.state.nTh
            && this.state.birthdate
            && this.state.id
            && this.state.password
            && this.state.major
            && this.state.studentNumber //변수이름 바꾸기
            && this.state.email
            && this.state.phoneNumber)
  }

  handleCancelProfile() {
    this.setState({ previewVisible: false })
  }

  handlePreview(file) {
    this.setState({
      profile: file.url || file.thumbUrl,
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
        phoneNumber.slice(phoneNumber.length - 1)
      ].join('-')
    }
    this.setState({ phoneNumber })
  }

  onKeyDownBackspace(e) {
    this.isKeyBackspace = (e.key === 'Backspace')
  }

  render() {
    const {
      fullname, id, password, passwordCheck, major,
      studentNumber, email, phoneNumber, favoriteComic, favoriteCharacter,
      fileList, previewVisible, profile,
      agreeLaw, agreeTerms,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div><p> 업로드 </p></div>
      </div>
    );

    return (
      <LocaleProvider locale={koKR}>
        {
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
                action="//jsonplaceholder.typicode.com/posts/" // 실제로 작동하게
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
                              src={profile}
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
                        onChange={(e) => this.onChangeInput({ fullname: e.target.value })}
                        value={fullname}
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
                        onChange={(e) => this.onChangeInput({ id: e.target.value })}
                        value={id}
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
                        onChange={(value, option) => this.onMajorChange(value, option)}
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
                            addonBefore="만화"
                            size="large"
                            style={{ width: '288px', marginBottom: '8px' }}
                            onChange={(e) => this.onChangeInput({ favoriteComic: e.target.value })}
                            placeholder="ex) 하이큐"
                            value={favoriteComic}
                          />
                          <Input
                            addonBefore="캐릭터"
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
        }
      </LocaleProvider>
    )
  }
}

export default Registration
