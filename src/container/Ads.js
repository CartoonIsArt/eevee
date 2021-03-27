import React, { Component } from 'react'
import Namecard from '../components/Namecard'
import { Card, Popover } from 'antd'

class Ads extends Component {
  render() {
    return (
      <article style={{
        display: 'flex', padding: '8px', flexDirection: 'column', marginBottom: '4px', background: '#FFFFFF', maxHeight: '396px',
      }}
      >
        <div style={{ height: '48px', display: 'flex' }}>
          <div style={{ width: '48px' }}>
            <img alt="AuthProf" width="100%" src="https://cia.kw.ac.kr/media/27feac77-07a8-4568-a2e4-85905ea294f1.png" />
          </div>
          <div style={{ fontSize: '14pt', flexGrow: 1, padding: '8px' }}>
            <Popover placement="leftTop" content={<Namecard />}>
              {' '}
              <a> 16기 윤여균</a>
            </Popover>
          </div>
        </div>
        <div style={{ padding: '4px' }}>
          <Card bodyStyle={{ padding: 0 }}>
            <div style={{ maxHeight: '300px', overflow: 'hidden' }}>
              <img alt="Ad" width="100%" src="https://cia.kw.ac.kr/media/c9d72e6d-b82a-499f-b7fa-a20854006fbd.jpg" />
            </div>
            <div className="custom-card">
              <h3 style={{ textAlign: 'center' }}> 2학기 개강총회 회의록</h3>
            </div>
          </Card>
        </div>
      </article>
    )
  }
}

export default Ads
