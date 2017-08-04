import React from 'react'
import { Icon, Button, Form, DatePicker, Input } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', background: '#ffffff', marginLeft: '8px', marginTop: '8px', display: 'flex', flexDrection: 'column' }}>
        <div style={{ width: '400px', marginTop: '100px', marginLeft: '80px' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="이름"
            >
              <Input placeholder="ex) 19기 xxx" />
            </FormItem>
            <FormItem
              label="이메일"
            >
              <Input placeholder="ex) example@example.com" />
            </FormItem>
            <FormItem
              label="생일"
            >
              <DatePicker />
            </FormItem>
            <FormItem
              label="학과"
            >
              <Input placeholder="ex) 컴퓨터소프트웨어학과" />
            </FormItem>
            <FormItem
              label="핸드폰 번호"
            >
              <Input addonBefore={'010'} style={{ width: '100%' }} placeholder="ex) 1234 - 1234" />
            </FormItem>
            <FormItem
              label="좋아하는 캐릭터"
            >
              <Input addonBefore={' 만화 제목 '} style={{ width: '100%' }} placeholder="ex) 하이큐" />
              <Input addonBefore={'캐릭터 이름'} style={{ width: '100%' }} placeholder="ex) 카게야마 토비오 " />
            </FormItem>
          </Form>
          <div style={{ marginTop: '80px', marginLeft: '400px' }}>
            <Button type="primary"> 저장 </Button>
          </div>
        </div>
        <div style={{ width: '400px', marginTop: '100px', marginLeft: '40px', display: 'flex', flexDrection: 'row' }}>
          <Form onSubmit={this.handleSubmit}>
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
