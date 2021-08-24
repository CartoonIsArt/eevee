import { Button, Icon } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Regulared extends Component {
  render() {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', textAlign: 'center', width: '1040px', backgroundColor: 'white', padding: '0px 20px',
      }}
      >
        <div style={{
          display: 'flex', flexDirection: 'column', border: '4px solid black', height: '400px', fontWeight: 'bold', fontSize: '48px', color: '#66BB6A', padding: '16px', margin: '20px 0px 10px 0px',
        }}
        >
          <div style={{ fontSize: '160px' }}><Icon type="check" /></div>
          <div>활동인구 등록이 완료되었습니다!!</div>
        </div>
        <div style={{
          display: 'flex', flexDirection: 'column', fontWeight: 'bold', fontSize: '16px',
        }}
        >
          <div style={{ fontSize: '24px' }}>[활동인구 혜택]을 맘껏 누리세요</div>
          <div>활동인구 유효기간은 개강총회부터 종강총회까지 입니다.</div>
        </div>
        <div>
          <Link to="/">
            <Button
              size="large"
              icon="double-right"
              style={{
                margin: '10px 0px', fontWeight: 'bold', fontSize: '20px', color: 'white', backgroundColor: '#1976D2',
              }}
            >
              메인 페이지로
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
export default Regulared
