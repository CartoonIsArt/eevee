import React, { Component } from 'react'
import { Select } from 'antd'

const Option = Select.Option

const user = {
  name: '13기 송민준',
  grade: '정회원',
}

function handleChange(value) {
  user.grade = value;
  console.log(user.grade);
}

class Members extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '1000px', margin: '0px 8px', padding: '0px 20px', background: '#FFFFFF' }}>
        <div style={{ height: '2%' }} />
        <div style={{ height: '5%' }}>
          <h1> 회원목록 </h1>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '8px', width: '944px', height: '80%', outline: 'solid black 1px' }}>
          <div style={{ height: '5%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '25%' }}>
              <a> 기수 이름 </a>
            </div>
            <div style={{ width: '15%' }}>
              <a> 활동여부</a>
            </div>
            <div style={{ width: '15%' }}>
              <a> 회의참석</a>
            </div>
            <div style={{ width: '15%' }}>
              <a> 회비납부</a>
            </div>
            <div style={{ width: '15%' }}>
              <a> 회원등급</a>
            </div>
            <div style={{ width: '15%' }}>
              <a> 징계</a>
            </div>
          </div>
          <div style={{ height: '5%', display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '25%' }}>
              <a> {user.name} </a>
            </div>
            <div style={{ width: '15%' }} />
            <div style={{ width: '15%' }} />
            <div style={{ width: '15%' }} />
            <div style={{ width: '15%' }}>
              <Select
                size="small"
                defaultValue={user.grade}
                style={{ width: 80 }}
                onChange={handleChange}
              >
                <Option value="준회원"> 준회원 </Option>
                <Option value="정회원"> 정회원 </Option>
                <Option value="임원"> 임원</Option>
              </Select>
            </div>
            <div style={{ width: '15%' }} />
          </div>
        </div>
      </div>
    )
  }
}

export default Members
