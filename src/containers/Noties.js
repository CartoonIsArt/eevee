import React, { Component } from 'react'
import { Icon, Popconfirm } from 'antd'
import Line from '../components/Line'

class Noties extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div style={{ height: '192px', backgroundColor: 'white', padding: '4px' }}>
        <div style={{ height: '15%', fontSize: '12pt', textAlign: 'left', display: 'flex', flexDrection: 'column' }}>
          <div style={{ marginRight: '240px', marginLeft: '12px', fontSize: '12pt' }}>
            <Icon type="notification" />
          </div>
          <div style={{ fontSize: '12pt', marginTop: '4px' }}>
            <a href="#">설정</a>
          </div>
        </div>
        <Line />
        {iter.map(i =>
          (<div>
            <div key={i} style={{ height: '25%', display: 'flex', alignItems: 'stretch' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '24px', overflow: 'hidden' }}>
                <a href="#"><img width="100%" src="https://cia.kw.ac.kr/media/1646b774-0365-4001-8285-42033807b32d.jpg" alt="profile" /></a>
              </div>
              <div style={{ flexGrow: '2', display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: '24px', marginLeft: '12px' }}>
                    <Popconfirm title="Are you sure delete this task?">
                      <a href="#"> 임원진</a>
                    </Popconfirm>
                  </div>
                  <div style={{ color: '#dfdfdf' }}> 2017-06-10 </div>
                </div>
                <div style={{ flexGrow: '1', display: 'flex', marginLeft: '12px' }}> 공지알람글 </div>
              </div>
            </div>
            <Line />
          </div>),
        )}
      </div>
    )
  }
}

export default Noties
