import React, { Component } from 'react'
import { Button } from 'antd'

class Dashboard extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', margin: '0px 8px 0px 8px', width: '1040px', padding: '0px 20px 0px 20px' }}>
        <div style={{ height: '10px' }} />
        <div style={{ width: '100%', fontSize: '32px', fontWeight: 'bold', color: '#1976D2' }}>
        ● 지금 활동인구에 등록해 보세요!
        </div>
        <div style={{ height: '20px' }} />
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', overflow: 'hidden' }}>
          <div style={{ height: '388px', width: '69%' }}>
            <img src="http://i.imgur.com/xOR7aaQ.jpg" alt="활동인구" />
          </div>
          <div style={{ width: '20px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', width: '29%', height: '388px' }}>
            <div style={{ height: '100%', padding: '8px', fontSize: '16px', fontWeight: 'bold', border: '1px solid black', borderRadius: '4px' }}>
            ● 동아리 회의 투표권<br />● 동방 재실권<br />● 동게 프리미엄 계정
            </div>
            <div style={{ height: '20px' }} />
            <div style={{ textAlign: 'center' }}>
              <Button style={{ fontSize: '12pt', fontWeight: 'bold', backgroundColor: '#1976D2', color: 'white' }}>≫ 활동인구 등록하기!!</Button>
            </div>
          </div>
        </div>
        <div style={{ height: '20px' }} />
        <div style={{ fontSize: '16px', fontWeight: 'bold', padding: '16px', border: '2px solid #1976D2', borderRadius: '4px' }}>
        활동인구는 ~~~~
        </div>
      </div>
    )
  }
}
export default Dashboard
