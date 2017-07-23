import React, { Component } from 'react'
import { Button, Icon } from 'antd'

class Dashboard extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', margin: '0px 8px', width: '1040px', padding: '0px 20px' }}>
        <div style={{ width: '100%', fontSize: '32px', fontWeight: 'bold', color: '#1976D2', margin: '20px 0px 10px 0px' }}>
          <Icon type="right-square-o" /> 지금 활동인구에 등록해 보세요!
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', margin: '10px 0px' }}>
          <div style={{ height: '388px', width: '69%', marginRight: '20px', overflow: 'hidden' }}>
            <img src="http://i.imgur.com/xOR7aaQ.jpg" alt="활동인구" />
          </div>
          <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', padding: '8px', width: '29%', border: '1px solid black', borderRadius: '4px', height: '388px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: '20px', fontWeight: 'bold' }}>
              <div><Icon type="right-circle" />동아리 회의 투표권</div>
              <div><Icon type="right-circle" />동방 재실권</div>
              <div><Icon type="right-circle" />동게 프리미엄 계정</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button size="large" icon="double-right" style={{ fontSize: '14pt', fontWeight: 'bold', backgroundColor: '#1976D2', color: 'white' }}> 활동인구 등록하기!!</Button>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 'bold', padding: '16px', border: '2px solid #1976D2', borderRadius: '4px', margin: '10px 0px' }}>
        활동인구는 ~~~~
        </div>
      </div>
    )
  }
}
export default Dashboard
