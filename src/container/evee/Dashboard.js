import React, { Component } from 'react'
import { Button, Icon } from 'antd'
import Regulared from './Regulared'

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivated: false,
    }
  }
  render() {
    return (
      <div>
        {this.state.isActivated ?
          <Regulared /> :
          <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', margin: '0px 8px', width: '1040px', padding: '0px 20px' }}>
            <div style={{
              width: '100%',
              fontSize: '32px',
              fontWeight: 'bold',
              margin: '20px 0px 10px 0px' }}
            >
              지금 활동인구에 등록해 보세요!
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', margin: '10px 0px' }}>
              <div style={{ height: '388px', width: '69%', marginRight: '20px', overflow: 'hidden' }}>
                <img src="http://i.imgur.com/xOR7aaQ.jpg" alt="활동인구" />
              </div>
              <div style={{ justifyContent: 'space-between', display: 'flex', flexDirection: 'column', padding: '8px', width: '29%', border: '1px solid black', borderRadius: '4px', height: '388px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontSize: '20px', fontWeight: 'bold' }}>
                  <div style={{ margin: '6px 0px' }}><Icon size="small" style={{ margin: '4px' }} type="inbox" />동아리 회의 투표권</div>
                  <div style={{ margin: '6px 0px' }}><Icon size="small" style={{ margin: '4px' }} type="home" />동방 재실권</div>
                  <div style={{ margin: '6px 0px' }}><Icon size="small" style={{ margin: '4px' }} type="user-add" />동게 프리미엄 계정</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <a href="https://cia.kw.ac.kr/wiki/index.php?title=%ED%9A%8C%EC%B9%99#.EC.A0.9C3.EC.A0.88_.EC.A0.95.ED.9A.8C.EC.9B.90">
                    <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>회칙 보기</div>
                  </a>
                  <Button
                    onClick={() => this.setState({ isActivated: true })}
                    size="large"
                    icon="double-right"
                    style={{ fontSize: '14pt', fontWeight: 'bold', backgroundColor: '#1976D2', color: 'white' }}
                  >활동인구 등록하기!!</Button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}
export default Dashboard
