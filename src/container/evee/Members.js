import React from 'react'
import { Modal, Icon, Button, Form, DatePicker, Input } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      userName: '',
      Email: '',
      Major: '',
      PhoneNumber: '',
      Title: '',
      Character: '',
    }
  }
  onChangeInput(e) {
    this.setState(e);
  }
  handleOk() {
    console.log(this.state);
    this.setState({
      visible: false,
    });
  }
  handleCancel() {
    console.log(this.state);
    this.setState({
      visible: false,
    });
  }
  showModal() {
    this.setState({
      visible: true,
    });
  }
  render() {
    const { userName, Email, Major, PhoneNumber, Title, Character } = this.state;
    console.log(userName)
    console.log(Email)
    return (
      <div style={{ width: '100%', background: '#ffffff', marginLeft: '8px', marginTop: '8px', display: 'flex', flexDrection: 'column' }}>
        <div style={{ width: '400px', marginTop: '52px', marginLeft: '80px' }}>
          <h1 style={{ marginBottom: '52px' }}> 프로필 수정 </h1>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="이름"
            >
              <Input
                onChange={e => this.onChangeInput({ userName: e.target.value })}
                placeholder="ex) 19기 xxx"
                value={userName}
              />
            </FormItem>
            <FormItem
              label="이메일"
            >
              <Input
                onChange={e => this.onChangeInput({ Email: e.target.value })}
                placeholder="ex) example@example.com"
                value={Email}
              />
            </FormItem>
            <FormItem
              label="생일"
            >
              <DatePicker />
            </FormItem>
            <FormItem
              label="학과"
            >
              <Input
                onChange={e => this.onChangeInput({ Major: e.target.value })}
                placeholder="ex) 컴퓨터소프트웨어학과"
                value={Major}
              />
            </FormItem>
            <FormItem
              label="핸드폰 번호"
            >
              <Input
                addonBefore={'010'}
                style={{ width: '100%' }}
                onChange={e => this.onchangeInput({ PhoneNumber: e.target.value })}
                placeholder="ex) 1234 - 1234"
                value={PhoneNumber}
              />
            </FormItem>
            <FormItem
              label="좋아하는 캐릭터"
            >
              <Input
                addonBefore={' 만화 제목 '}
                style={{ width: '100%' }}
                onChange={e => this.onChangeInput({ Title: e.target.value })}
                placeholder="ex) 하이큐"
                value={Title}
              />
              <Input
                addonBefore={'캐릭터 이름'}
                style={{ width: '100%' }}
                onChange={e => this.onChangeInput({ Character: e.target.value })}
                placeholder="ex) 카게야마 토비오 "
                value={Character}
              />
            </FormItem>
          </Form>
          <div style={{ marginTop: '80px', marginLeft: '400px', marginBottom: '80px' }}>
            <Button type="primary" onClick={() => this.showModal()}> 저장 </Button>
            <Modal
              title="수정 하시겠습니까?"
              visible={this.state.visible}
              onOk={() => this.handleOk()}
              onCancel={() => this.handleCancel()}
              okText="확인"
              cancelText="취소"
            >
              <p> 비밀번호를 입력하세요</p>
              <input style={{ width: '200px', marginTop: '12px' }} />
            </Modal>
          </div>
        </div>
        <div style={{ width: '400px', marginTop: '136px', marginLeft: '40px', display: 'flex', flexDrection: 'row' }}>
          <Form onSubmit={() => this.handleSubmit()}>
            <FormItem
              label="프로필 사진"
            >
              <div>
                <Button>
                  <Icon type="upload" /> 파일선택
                </Button>
              </div>
              <div style={{ marginTop: '8px' }}>
                <img alt="example" style={{ width: '240px' }} src={'https://cia.kw.ac.kr/media/7efeeb45-097e-4d9a-bc37-da767dc97ceb.jpg'} />
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const Members = Form.create()(RegistrationForm);

export default Members
