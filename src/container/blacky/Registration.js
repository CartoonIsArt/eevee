import React, { Component } from 'react'
import { Alert, Button, Cascader, DatePicker, Form, Icon, Input, LocaleProvider, message, Modal, Upload } from 'antd'
import moment from 'moment'
import koKR from 'antd/lib/locale-provider/ko_KR'

const FormItem = Form.Item;

const options = [];

function init() {
  for (let i = 1; i <= moment().get('year') - 1998; i += 1) {
    options.push({ value: i, label: `${i}기` });
  }
}
init();


function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Registration extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userName: '',
      기수: '', // 영어로 뭐라고 할까
      birthday: '',
      id: '',
      password: '',
      passwordCheck: '',
      major: '',
      number: '',
      email: '',
      phoneNumber: '',
      title: '',
      character: '',
      profile: 'https://pbs.twimg.com/media/DLJeodaVoAAIkUU.jpg',
      previewVisible: false,
      fileList: [],
    };
  }

  onChangeInput(e) {
    this.setState(e);
  }
  onNumberChange(value, selectedOptions) {
    console.log(value, selectedOptions);
    this.setState({ 기수: selectedOptions });
  }
  onDateChange(date, dateString) {
    console.log(date, dateString);
    this.setState({ birthday: dateString });
  }
  onButtonClicked() {
    if (this.isEmpty()) {
      Modal.warning({ title: '입력을 확인해주세요', content: '입력하지 않은 필수 항목이 있습니다.' });
      return;
    } else if (this.state.password !== this.state.passwordCheck) {
      Modal.warning({ title: '비밀번호를 확인해주세요', content: '비밀번호 재입력이 일치하지 않습니다.' });
      return;
    }
    console.log(this.state);
    // location.href = '/login';
  }
  isEmpty() {
    if (!(this.state.userName &&
          this.state.기수 &&
          this.state.birthday &&
          this.state.id &&
          this.state.password &&
          this.state.major &&
          this.state.number &&
          this.state.email &&
          this.state.phoneNumber)
        ) { return true; }
    return false;
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

  render() {
    const { userName, id, password, passwordCheck, major,
        number, email, phoneNumber, title, character,
        fileList, previewVisible, profile } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div><p> 업로드 </p></div>
      </div>
      );

    return (
      <LocaleProvider locale={koKR}>
        <div style={{ width: '1280px' }} /* 전체 div */ >
          <div style={{ display: 'flex', marginLeft: '220px' }} /* 왼쪽 div */ >
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
                > CIA 회원가입 </div>
              </div>
              <img
                src="https://static.zerochan.net/Roa.%28Onoue.Ren%29.full.2177663.jpg"
                alt="가로로 긴 그림"
                style={{ width: '512px', overflow: 'hidden' }}
              />
            </div>
            <div style={{ width: '288px', marginTop: '20px' }} /* 오른쪽 div */ >
              <Alert message="* 부분은 필수 입력사항입니다" type="warning" />
              <Form style={{ marginTop: '20px' }}>
                <FormItem label="프로필 사진">
                  <div style={{ marginTop: '8px' }}>
                    <div>
                      <Upload
                        action="//jsonplaceholder.typicode.com/posts/"  // 실제로 작동할 수 있도록 작성해야 함
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={e => this.handlePreview(e)}
                        onChange={e => this.handleChange(e)}
                        beforeUpload={e => beforeUpload(e)}
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
                  onChange={e => this.onChangeInput({ userName: e.target.value })}
                  value={userName}
                />
              </div>
              <div style={{ display: 'flex', marginBottom: '20px' }}>
                <div>
                  <Cascader
                    style={{ width: '140px', marginRight: '8px' }}
                    options={options}
                    size="large"
                    onChange={(value, option) => this.onNumberChange(value, option)}
                    placeholder="*기수를 선택하세요"
                    showSearch
                  />
                  <DatePicker
                    style={{ width: '140px' }}
                    size="large"
                    onChange={(date, dateString) => this.onDateChange(date, dateString)}
                    placeholder="*생일을 선택하세요"
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <Input
                  addonBefore="*아이디"
                  size="large"
                  style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                  onChange={e => this.onChangeInput({ id: e.target.value })}
                  value={id}
                />
                <Input
                  addonBefore="*비밀번호"
                  type="password"
                  size="large"
                  style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                  onChange={e => this.onChangeInput({ password: e.target.value })}
                  value={password}
                />
                <Input
                  addonBefore="*비밀번호 확인"
                  type="password"
                  size="large"
                  style={{ width: '288px' }}
                  onChange={e => this.onChangeInput({ passwordCheck: e.target.value })}
                  value={passwordCheck}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <Input
                  addonBefore="*학과(학부)"
                  size="large"
                  style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                  onChange={e => this.onChangeInput({ major: e.target.value })}
                  placeholder="ex) 컴퓨터정보공학부"
                  value={major}
                />
                <Input
                  addonBefore="*학번"
                  size="large"
                  style={{ width: '288px' }}
                  onChange={e => this.onChangeInput({ number: e.target.value })}
                  placeholder="ex) 2017000000"
                  value={number}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px' }}>
                <Input
                  addonBefore="*이메일"
                  size="large"
                  style={{ width: '288px', marginRight: '20px', marginBottom: '8px' }}
                  onChange={e => this.onChangeInput({ email: e.target.value })}
                  placeholder="ex) example@example.com"
                  value={email}
                />
                <Input
                  addonBefore="*핸드폰(010-)"
                  size="large"
                  style={{ width: '288px' }}
                  onChange={e => this.onChangeInput({ phoneNumber: e.target.value })}
                  placeholder="ex) 1234-5678"
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
                      onChange={e => this.onChangeInput({ title: e.target.value })}
                      placeholder="ex) 하이큐"
                      value={title}
                    />
                    <Input
                      addonBefore="캐릭터"
                      size="large"
                      style={{ width: '288px', marginBottom: '20px' }}
                      onChange={e => this.onChangeInput({ character: e.target.value })}
                      placeholder="ex) 카게야마 토비오"
                      value={character}
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
      </LocaleProvider>
    )
  }
}

export default Registration
