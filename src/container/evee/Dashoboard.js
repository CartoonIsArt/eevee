import React, { Component } from 'react'
import { Button } from 'antd'

class Dashboard extends Component {
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', width: '1000px', height: '1618px' }}>

        <div style={{ height: '48px', width: '100%', fontSize: '22pt', fontWeight: 'bold', color: '#FF8900', backgroundColor: 'white', borderRadius: '0.25em' }}>
    &nbsp;||&nbsp; 활동인구 등록
    </div>

        <div style={{ height: '20px' }} />
        <div style={{ overflow: 'hidden', height: '180px', width: '100%' }}>
          <img width="100%" src="http://i.imgur.com/Erf8prO.jpg" alt="활동인구" />
        </div>
        <div style={{ height: '20px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', border: '2px solid #1976D2', borderRadius: '0.25em', backgroundColor: 'white' }}>
          <div style={{ width: '100%', textAlign: 'center', padding: '20px', fontSize: '25pt', borderBottom: '1px solid black' }}>
      활동인구란?
      </div>
          <div style={{ padding: '15px', fontSize: '17pt' }}>
      활동인구 설명<br /><br /><br /><br /><br /><br /><br />설명 끝
      </div>
          <div style={{ width: '100%', padding: '20px', borderTop: '1px solid black', textAlign: 'center' }} >
            <Button style={{ fontSize: '10pt', fontWeight: 'bold' }}> 활동인구<br /> 등록하기!!</Button>
          </div>
        </div>

      </div>
    )
  }
}

export default Dashboard
