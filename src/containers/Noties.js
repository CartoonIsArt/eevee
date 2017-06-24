import React, { Component } from 'react'
import { Icon, Popover } from 'antd'
import Line from '../components/Line'
import Profile from './Profile'

class Noties extends Component {
  render() {
    const iter = [1, 2, 3, 4]
    return (
      <div style={{ height: '192px', backgroundColor: 'white', padding: '4px' }}>
        <div style={{ height: '28px', fontSize: '12pt', textAlign: 'left', display: 'flex', flexDrection: 'column' }}>
          <div style={{ marginRight: '228px', marginLeft: '12px', fontSize: '12pt' }}>
            <Icon type="notification" />
          </div>
          <div style={{ fontSize: '12pt', marginTop: '4px' }}>
            <a href="#">설정</a>
          </div>
        </div>
        <Line />
        <div style={{ height: '156px', overflowY: 'scroll' }}>
        {iter.map(i =>
          (<div>
            <div key={i} style={{ height: '48px', display: 'flex', alignItems: 'stretch' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '24px', overflow: 'hidden' }}>
                <a href="#"><img width="100%" src="https://cia.kw.ac.kr/media/1646b774-0365-4001-8285-42033807b32d.jpg" alt="profile" /></a>
              </div>
              <div style={{ flexGrow: '2', display: 'flex', alignItems: 'stretch', flexDirection: 'column' }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ marginRight: '24px', marginLeft: '12px' }}>
                    <Popover placement="leftTop"
                      content={
                        <div style={{ width: '320px' }}>
                          <Profile />
                        </div>
                      }
                    >
                      <a href="#"> 임원진</a>
                    </Popover>
                  </div>
                  <div style={{ color: '#dfdfdf' }}> 2017-06-10 </div>
                </div>
                <div style={{ flexGrow: '1', display: 'flex', marginLeft: '12px' }}>
                  <a gref="#"> 공지알람글</a>
                </div>
              </div>
            </div>
            <Line />
          </div>),
        )}
        </div>
      </div>
    )
  }
}

export default Noties
