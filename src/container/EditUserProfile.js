import React, { Component } from 'react'
import koKR from 'antd/lib/locale-provider/ko_KR';
import { connect } from 'react-redux';
import { patchUser, getUser } from '../actions';
import {
  Button,
  LocaleProvider,
  Upload,
  message,
  DatePicker,
  Form,
  Icon,
  Modal,
  Input,
  Cascader,
} from 'antd'
import moment from 'moment';

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
  ],
}, {
  label: '소프트웨어융합대학',
  value: '소프트웨어융합대학',
  children: [
    { label: '소프트웨어학부', value: '소프트웨어학부' },
    { label: '컴퓨터정보공학부', value: '컴퓨터정보공학부' },
    { label: '정보융합학부', value: '정보융합학부' },
  ],
}, {
  label: '공과대학',
  value: '공과대학',
  children: [
    { label: '건축공학과', value: '건축공학과' },
    { label: '환경공학과', value: '환경공학과' },
    { label: '화학공학과', value: '화학공학과' },
    { label: '건축학과', value: '건축학과' },
  ],
}, {
  label: '자연과학대학',
  value: '자연과학대학',
  children: [
    { label: '수학과', value: '수학과' },
    { label: '화학과', value: '화학과' },
    { label: '전자바이오물리학과', value: '전자바이오물리학과' },
    { label: '스포츠융합과학과', value: '스포츠융합과학과' },
    { label: '정보콘텐츠학과(야)', value: '정보콘텐츠학과(야)' },
  ],
}, {
  label: '인문사회과학대학',
  value: '인문사회과학대학',
  children: [
    { label: '국어국문학과', value: '국어국문학과' },
    { label: '영어산업학과', value: '영어산업학과' },
    { label: '미디어커뮤니케이션학부', value: '미디어커뮤니케이션학부' },
    { label: '산업심리학과', value: '산업심리학과' },
    { label: '동북아문화산업학부', value: '동북아문화산업학부' },
  ],
}, {
  label: '정책법학대학',
  value: '정책법학대학',
  children: [
    { label: '행정학과', value: '행정학과' },
    { label: '법학부', value: '법학부' },
    { label: '국제학부', value: '국제학부' },
    { label: '자산관리학과(야)', value: '자산관리학과(야)' },
  ],
}, {
  label: '경영대학',
  value: '경영대학',
  children: [
    { label: '경영학부', value: '경영학부' },
    { label: '국제통상학부', value: '국제통상학부' },
  ],
},
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

class EditUserProfile extends Component {
  constructor(props) {
    super(props)
    this.props.getUser()
    this.state = {
      visible: false,
      bVisible: false,
      id: '', 
      email: this.props.user.email,
      birthdate: this.props.user.birthdate,
      major: this.props.user.major,
      phoneNumber: this.props.user.phoneNumber,
      favoriteComic: this.props.user.favoriteComic,
      favoriteCharacter: this.props.user.favoriteCharacter,
      profile: this.props.user.profileImage.savedPath,
      banner: '/images/profile_banner_default.png',// 수정필요 (user가 bannerPath를 가지게되면)
      previewVisible: false,
      bannerPreviewVisible: false,
      fileList: [{
        uid: -1,
        name: 'profileImageDefault',
        status: 'done',
        url: this.props.user.profileImage.savedPath,
      }],
      bannerFileList: [{
        uid: -1,
        name: 'bannerImageDefault',
        status: 'done',
        url: '/images/profile_banner_default.png', // 수정필요 (user가 bannerPath를 가지게되면)
      }],
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

    const user = {
      id: this.props.user.id,
      email: this.state.email,
      birthdate: this.state.birthdate,
      major: this.state.major,
      phoneNumber: this.state.phoneNumber,
      favoriteComic: this.state.favoriteComic,
      favoriteCharacter: this.state.favoriteCharacter,
      profile: this.state.profile,
    }

    // TO DO : 수정하기 (try catch가 안되는 코드임)
    try{
      this.props.patchUser(user);
    }
    catch(e){
      console.log(e)
      Modal.warning({ title: '회원정보수정에 실패했습니다.', content: '입력정보를 확인해주세요.' })
    }
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
      profile: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleBannerPreview(file) {
    this.setState({
      banner: file.url || file.thumbUrl,
      bannerPreviewVisible: true,
    });
  }

  handleChange({ fileList }) {
    this.setState({ fileList })
  }

  handleBannerChange({ fileList }) {
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
      email, major, phoneNumber, favoriteComic, favoriteCharacter,
      previewVisible, bannerPreviewVisible, profile, banner, fileList, bannerFileList, birthdate
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
          flexWrap: 'wrap',
        }}
        >
          <h1 style={{ margin: '12px 0px 12px 12px' }}> 프로필 수정 </h1>
          <div className="header">
            <div className="background-image">
              <div className="user-banner">
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/" // 실제로 작동할 수 있도록 작성해야 함
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
                    src={banner}
                  />
                </Modal>
              </div>
              <div className="user-profile">
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
            <div className="menu-bar"/>
          </div>
          <div className="input">
            <Input
              addonBefore="*이메일"
              onChange={(e) => this.onChangeInput({ email: e.target.value })}
              placeholder="ex) example@example.com"
              value={email}
            />
            <DatePicker
              defaultValue={moment(birthdate, 'YYYY-MM-DD')}
              onChange={(_, dateString) => this.onDateChange(_, dateString)}
              placeholder="*생일을 선택하세요"
              disabledDate={(currentDate) => { isPermittedBirthdate(currentDate) }}
            />
            <Cascader
              //defaultValue={[major]} DB를 수정하고 수정
              style={{ width: '288px', marginBottom: '8px' }}
              options={majors}
              size="large"
              onChange={(value) => this.onMajorChange(value)}
              placeholder="*전공"
            />
            <Input
              addonBefore="*전화번호"
              style={{ width: '100%' }}
              onChange={(e) => this.onChangePhoneNumber(e.target.value)}
              onKeyDown={(e) => this.onKeyDownBackspace(e)}
              placeholder="ex) 010-1234-1234"
              value={phoneNumber}
            />
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
