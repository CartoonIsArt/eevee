import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions'

const Button = require('antd/lib/button')

class Logout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOnce: true,
    }
  }

  setIsOnce() {
    if (this.state.isOnce) {
      this.setState({ isOnce: false })
    }
  }

  render() {
    // const user = this.props.user
    return (
      <div style={{
        height: '680px',
        width: '1040px',
        overflow: 'hidden',
        backgroundImage: 'url("https://t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/2ksh/image/uW0QiOZgmLRMPf8LFDSI32nJMVQ.jpg")',
      }}
      >
        <div
          // 로그아웃 사각형
          style={{
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            margin: 'auto',
            marginTop: '200px',
            flexDirection: 'column',
            padding: '12px',
            border: '2px solid black',
            borderRadius: '10px',
            width: '288px',
            height: '284px',
            backgroundColor: 'rgba(255,255,255,0.5)',
          }}
        >
          <div style={{ height: '160px', width: '160px' }}>
            { !this.state.isOnce
              ? (
                <img
                  src="https://pbs.twimg.com/profile_images/692340077951787009/4WMBes3k.png"
                  alt="츤데레"
                  style={{ width: '100%', overflow: 'hidden' }}
                />
              )
              : (
                <img
                  src="https://pbs.twimg.com/profile_images/433619758450094080/dMpRXgMs_400x400.jpeg"
                  alt="세상에서 제일 귀여운 호시이 미키"
                  style={{ width: '100%', overflow: 'hidden' }}
                />
              )}
          </div>
          <div style={{ height: '120px' }}>
            <p style={{ marginTop: '4px', fontSize: '16px', fontWeight: 'bold' }}> 정말 떠나버릴 거야…? </p>
          </div>
          <div>
            <div>
              <Link to="/">
                <Button style={{ marginBottom: '4px' }} type="primary" size="large" icon="login"> 떠나지 않는다 </Button>
              </Link>
            </div>
            <div>
              { this.state.isOnce
                ? (
                  <Button
                    type="danger"
                    size="small"
                    icon="user"
                    onClick={() => {
                      this.setIsOnce()
                    }}
                  >
                    떠난다
                  </Button>
                )
                : (
                  <Button
                    type="danger"
                    size="small"
                    icon="user"
                    onClick={() => {
                      this.props.logout()
                    }}
                  >
                    난 떠날 거야
                  </Button>
                )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = () => ({
})

const mapDispatchToProps = ({
  logout,
})

export default connect(mapStateToProps,mapDispatchToProps)(Logout)
