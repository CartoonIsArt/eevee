import React, { Component } from 'react'
import { Card } from 'antd'

class Ads extends Component {
  render() {
    return (
      <article style={{ display: 'flex', padding: '8px', flexDirection: 'column', marginBottom: '4px', background: '#FFFFFF', maxHeight: '396px' }} >
        <div style={{ height: '48px', display: 'flex' }}>
          <div style={{ width: '48px' }}>
            <img alt="AuthProf" width="100%" src="https://cia.kw.ac.kr/media/27feac77-07a8-4568-a2e4-85905ea294f1.png" />
          </div>
          <div style={{ fontSize: '14pt', flexGrow: 1, padding: '8px' }}> <a> 16기 윤여균</a> </div>
        </div>
        <div style={{ padding: '12px' }}>
          <Card bodyStyle={{ padding: 0 }}>
            <div className="custom-image">
              <img alt="Ad" width="100%" src="https://cia.kw.ac.kr/media/c9d72e6d-b82a-499f-b7fa-a20854006fbd.jpg" />
            </div>
            <div className="custom-card">
              <h3> 2학기 개강총회 회의록</h3>
              <p> 2학기 개총회의록입니다.</p>
            </div>
          </Card>
        </div>
      </article>
    )
  }
}

export default Ads
