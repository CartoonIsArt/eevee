import React from 'react'
import { Form, DatePicker, Input } from 'antd';

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  render() {
    return (
      <div style={{ width: '100%', background: '#ffffff', marginLeft: '8px', marginTop: '8px' }}>
        <div style={{ width: '400px', marginTop: '100px', marginLeft: '80px' }}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              label="Nickname"
            >
              <Input placeholder="ex) 19기 xxx" />
            </FormItem>
            <FormItem
              label="E-mail"
            >
              <Input />
            </FormItem>
            <FormItem
              label="DatePicker"
            >
              <DatePicker />
            </FormItem>
            <FormItem
              label="학과"
            >
              <Input placeholder="ex) 컴퓨터소프트웨어학과" />
            </FormItem>
            <FormItem
              label="Phone Number"
            >
              <Input addonBefore={'010'} style={{ width: '100%' }} placeholder="ex) 1234 - 1234" />
            </FormItem>
            <FormItem
              label="좋아하는 캐릭터"
            >
              <Input placeholder="ex) 하이큐 히나타" />
            </FormItem>
          </Form>
        </div>
      </div>
    );
  }
}

const Members = Form.create()(RegistrationForm);

export default Members
