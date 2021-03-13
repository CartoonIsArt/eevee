import React, { Component } from 'react'
import koKR from 'antd/lib/locale-provider/ko_KR';
import { connect } from 'react-redux';
import { patchUser, getUser } from '../actions';

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

class EditUserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      id: '', //patchUser할때 넘겨줘야함
      email: '',
      birthdate: '',
      major: '',
      phoneNumber: '',
      favoriteComic: '',
      favoriteCharacter: '',
      password: '',
      profile: 'https://pbs.twimg.com/media/DLJeodaVoAAIkUU.jpg', // 기존 이미지로 설정해야됨
      previewVisible: false,
      fileList: [{
        uid: -1,
        name: 'defaultImage.jpg',
        status: 'done',
        url: 'https://pbs.twimg.com/media/DLJeodaVoAAIkUU.jpg',
      }],
    };
  }

  onChangeInput(e) {
    this.setState(e);
  }

  onDateChange(date, dateString) {
    console.log(date, dateString);
    this.setState({ birthdate: dateString });
  }

  handleOk() {
    const user = {
      id: this.props.user.id,
      email: this.state.email,
      birthdate: this.state.birthdate,
      major: this.state.major,
      phoneNumber: this.state.phoneNumber,
      favoriteComic: this.state.favoriteComic,
      favoriteCharacter: this.state.favoriteCharacter,
      profile: this.state.profile,  //백엔드수정
      password: this.state.password
    }
    try{
      this.props.patchUser(user);
    }
    catch(e){
      console.log(e)
      Modal.warning({ title: '회원정보수정에 실패했습니다.', content: '입력한 비밀번호를 확인해주세요.' })
    }
    this.setState({ visible: false });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  showModal() {
    this.setState({ visible: true });
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

  handleSubmit() {
    this.showModal();
  }

  render() {
    const {
      email, major, phoneNumber, favoriteComic, favoriteCharacter, password,
      previewVisible, profile, fileList,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div><p> 업로드 </p></div>
      </div>
    );

    return (
      <LocaleProvider locale={koKR}>
        <div style={{
          width: '100%',
          background: '#ffffff',
          marginLeft: '8px',
          marginTop: '8px',
          display: 'flex',
          flexDrection: 'column',
        }}
        >
          <div style={{
            width: '400px',
            marginTop: '52px',
            marginLeft: '80px',
          }}
          >
            <h1 style={{ marginBottom: '52px' }}> 프로필 수정 </h1>
            <Form onSubmit={() => this.handleSubmit()}>
              <FormItem
                label="이메일"
              >
                <Input
                  onChange={(e) => this.onChangeInput({ email: e.target.value })}
                  placeholder="ex) example@example.com"
                  value={email}
                />
              </FormItem>
              <FormItem
                label="생일"
              >
                <DatePicker
                  onChange={(date, dateString) => this.onDateChange(date, dateString)}
                  placeholder="날짜를 선택해주세요"
                />
              </FormItem>
              <FormItem
                label="학과(학부)"
              >
                <Input
                  onChange={(e) => this.onChangeInput({ major: e.target.value })}
                  placeholder="ex) 컴퓨터소프트웨어학과"
                  value={major}
                />
              </FormItem>
              <FormItem
                label="핸드폰 번호"
              >
                <Input
                  addonBefore="010"
                  style={{ width: '100%' }}
                  onChange={(e) => this.onChangeInput({ phoneNumber: e.target.value })}
                  placeholder="ex) 1234 - 1234"
                  value={phoneNumber}
                />
              </FormItem>
              <FormItem
                label="좋아하는 캐릭터"
              >
                <Input
                  addonBefore="만화 제목"
                  style={{ width: '100%' }}
                  onChange={(e) => this.onChangeInput({ favoriteComic: e.target.value })}
                  placeholder="ex) 하이큐"
                  value={favoriteComic}
                />
                <Input
                  addonBefore="캐릭터 이름"
                  style={{ marginTop: '8px', width: '100%' }}
                  onChange={(e) => this.onChangeInput({ favoriteCharacter: e.target.value })}
                  placeholder="ex) 카게야마 토비오"
                  value={favoriteCharacter}
                />
              </FormItem>
              <FormItem
                label="비밀번호 확인"
              >
                <Input
                  onChange={(e) => this.onChangeInput({ password : e.target.value })}
                  value={password}
                />
              </FormItem>
            </Form>
            <div style={{
              marginTop: '80px',
              marginLeft: '400px',
              marginBottom: '80px',
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
          </div>
          <div style={{
            width: '400px',
            marginTop: '136px',
            marginLeft: '40px',
            display: 'flex',
            flexDrection: 'row',
          }}
          >
            <Form onSubmit={() => this.handleSubmit()}>
              <FormItem label="프로필 사진">
                <div style={{ marginTop: '8px' }}>
                  <div>
                    <Upload
                      action="//jsonplaceholder.typicode.com/posts/" // 실제로 작동할 수 있도록 작성해야 함
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
          </div>
        </div>
      </LocaleProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})
const mapDispatchToProps = ({
  patchUser,
  getUser,
})

// const Members = Form.create()(RegistrationForm);

export default connect(mapStateToProps, mapDispatchToProps)(EditUserProfile)
// export default Members
