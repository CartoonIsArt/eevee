import React, { Component } from 'react'
import { Button } from 'antd'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivated: false,
    }
  }
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '660px',
          width: '100%',
          fontSize: '20px',
          margin: '0px 8px',
          textAlign: 'left',
          backgroundImage: "url('https://68.media.tumblr.com/c8b2b39b88e638dd419e6ca50a857131/tumblr_nnx1uqMP9v1r2pvg2o1_500.gif')",
            // 'http://upload2.inven.co.kr/upload/2017/06/04/bbs/i16530532793.jpg'
          backgroundSize: '100% 100%',
          overflow: 'hidden',
        }}
        align="middle"
      >
        <div
        /* 상단 바 */
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '232px',
          }}
        >
          <div style={{
            height: '80px',
            padding: '10px',
            fontSize: '40px',
            fontWeight: 'bold',
            textAlign: 'left',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
          >
            CIA 광운대학교 중앙 만화 동아리
            </div>
        </div>
        <div
            /* 로그인 사각형 */
          style={{
            textAlign: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            margin: '0 auto',
            flexDirection: 'column',
            padding: '12px',
            width: '25%',
            border: '2px solid black',
            borderRadius: '10px',
            height: '284px',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        >
          <div style={{ height: '120px' }}>
            <div style={{ textAlign: 'left' }}>
              <img
                src="https://cia.kw.ac.kr/media/logo.png"
                alt="CIA 로고"
                style={{ width: '240px', overflow: 'hidden' }}
              />
              <img
                src=""
                alt="2.0"
                style={{ width: '80px', overflow: 'hidden' }}
              />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}> 당신의 욕망을 이곳에서 ♥ </p>
          </div>
          <div /* 버튼 3개 */>
            <div><Button type="default" size="large" icon="login"> 로그인 </Button> </div>
            <div><Button type="default" size="large" icon="user"> 아이디/비밀번호 </Button> </div>
            <div><Button type="default" size="large" icon="edit"> 회원가입 </Button></div>
          </div>
        </div>
        <div style={{ height: '144px', marginLeft: '12px' }}>
          <div style={{ fontSize: '12px', marginTop: '80px', color: 'white' }}> 으으 오타쿠 극혐 </div>
          <Button type="danger" size="large" icon="rollback" onClick={window.location.assign('http://kr.battle.net/heroes/ko/')}> 도망가기 </Button>
        </div>
      </div>
    )
  }
}


export default Login
