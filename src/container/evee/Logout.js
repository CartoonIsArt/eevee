import React, { Component } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isActivated: false,
      isOnce: false,
    }
  }

  setIsOnce() {
    this.state.isOnce ? this.state.isOnce = true : <Link to="/" />
  }

  render() {
    return (
      <div style={{
        height: '680px',
        width: '1040px',
        overflow: 'hidden',
        backgroundImage: 'url("https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2ksh/image/uW0QiOZgmLRMPf8LFDSI32nJMVQ.jpg")',
      }}
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
              /* 로그아웃 사각형 */
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
            <div>
              { !this.state.isOnce ?
                <img
                  src="https://pbs.twimg.com/profile_images/433619758450094080/dMpRXgMs_400x400.jpeg"
                  alt="세상에서 제일 귀여운 호시이 미키"
                  style={{ width: '160px', overflow: 'hidden' }}
                /> :
                <img
                  src="https://iwiz-chie.c.yimg.jp/im_siggs_yNSfPvc6_4b7fwFQqGog---x320-y320-exp5m-n1/d/iwiz-chie/ans-410746295"
                  alt="츤데레"
                  style={{ width: '160px', overflow: 'hidden' }}
                />
                }
            </div>
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}> 정말 떠나버릴 거야…? </p>
          </div>
          <div /* 버튼 2개 */>
            <div>
              <Link to="/">
                <Button type="default" size="large" icon="login"> 떠나지 않는다 </Button>
              </Link>
            </div>
            <div>
              <Button
                type="default"
                size="small"
                icon="user"
                onClick={this.setIsOnce()}
              >
                  떠난다
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Logout
