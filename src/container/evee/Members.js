import React, { Component } from 'react'
import { Checkbox, Select, Table, message } from 'antd'

const Option = Select.Option

const users = [{
  name: '13기 송민준',
  active: false,
  attend: '불참',
  payment: '납',
  grade: '정회원',
  disciplinary: '-',
}, {
  name: '16기 김성우',
  active: true,
  attend: '참',
  payment: '납',
  grade: '정회원',
  disciplinary: '-',
}]

function handleChange(value) {
  users.grade = value;
  message.success('반영되었습니다.');
}

function payChange(value) {
  users.payment = value;
  message.success('반영되었습니다.');
}

const Activate = () => (
    users.active ? users.active = false : users.active = true
)

const columns = [{
  title: '기수 이름',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#"> {text} </a>,
}, {
  title: '활동여부',
  dataIndex: 'active',
  key: 'active',
  render: text => (
    <Checkbox
      checked={text}
      onChange={Activate}
      />
    ),
}, {
  title: '회의참석',
  dataIndex: 'attend',
  key: 'attend',
  render: text => <a href="#"> {text} </a>,
}, {
  title: '회비납부',
  dataIndex: 'payment',
  key: 'payment',
  render: text => (
    <Select
      defaultValue={text}
      style={{ width: 80 }}
      onChange={payChange}
    >
      <Option value="납">  납 </Option>
      <Option value="미납">  미납 </Option>
    </Select>
    ),
}, {
  title: '회원등급',
  dataIndex: 'grade',
  key: 'grade',
  render: text => (
    <Select
      defaultValue={text}
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Option value="준회원">  준회원 </Option>
      <Option value="정회원">  정회원 </Option>
      <Option value="임원">  임원 </Option>
    </Select>
    ),
}, {
  title: '징계',
  dataIndex: 'disciplinary',
  key: 'disciplinary',
  render: text => <h1> {text} </h1>,
}]

class Members extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '1000px', margin: '0px 8px', padding: '0px 20px', background: '#FFFFFF' }}>
        <div style={{ height: '2%' }} />
        <div style={{ height: '5%' }}>
          <h1> 회원목록 </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px', width: '944px', height: '80%', outline: 'solid black 1px' }}>
          <Table columns={columns} dataSource={users} />
        </div>
      </div>
    )
  }
}

export default Members
