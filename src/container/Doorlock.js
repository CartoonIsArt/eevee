import { Icon } from 'antd'
import React, { Component } from 'react'


class Doorlock extends Component {
  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        width: '100%',
        margin: '0px 8px',
        textAlign: 'center',
        backgroundColor: 'white',
      }}
      >
        <h1 style={{
          fontSize: '32pt',
          borderBottom: '1px solid black',
          padding: '20px',
          marginBottom: '12px',
        }}
        >
          동방 비밀번호
        </h1>
        <div style={{
          fontSize: '24px',
          color: 'red',
          margin: '12px 0px',
          padding: '12px',
        }}
        >
          <Icon type="exclamation-circle" />
          동방 비밀번호를 동아리 회원 이외의 사람이나 준회원에게 알려주면 안됩니다!
        </div>
        <div>동방비번</div>
      </div>
    )
  }
}

export default Doorlock
