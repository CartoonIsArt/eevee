import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Regulared from '../components/Regulared'
import { request } from '../fetches/request'
import { getUser } from '../actions'

const Button = require('antd/lib/button')
const Icon = require('antd/lib/icon')
const Modal = require('antd/lib/modal')

const args = [];

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: [],
      user: [],
    }
  }

  onClickMethod() {
    const { user } = this.props
    if (user.user === undefined) { this.props.getUser() }
    console.log(user.id)
    args.push({ type: 'Boolean', key: 'isActivated', value: true })
    request('PATCH', `users/${user.id}`, args)
      .then((r) => {
        this.props.getUser()
        this.setState({
          responses: r,
        })
      })
      .catch((e) => {
        this.setState({
          responses: e.response,
        })
        Modal.warning({ title: '활동인구 등록에 실패했습니다.' })
      })
  }

  render() {
    return (
      <div>
        {this.props.user.isActivated
          ? <Regulared />
          : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flex: '1',
              backgroundColor: 'white',
              margin: '0px 8px',
              padding: '0px 20px',
            }}
            >
              <div style={{
                width: '100%',
                fontSize: '32px',
                fontWeight: 'bold',
                margin: '20px 0px 10px 0px',
              }}
              >
                지금 활동인구에 등록해 보세요!
              </div>
              <div style={{
                display: 'flex', flexDirection: 'row', width: '100%', margin: '10px 0px',
              }}
              >
                <div style={{
                  height: '388px', width: '69%', marginRight: '20px', overflow: 'hidden',
                }}
                >
                  <img src="http://i.imgur.com/xOR7aaQ.jpg" alt="활동인구" />
                </div>
                <div style={{
                  justifyContent: 'space-between', display: 'flex', flexDirection: 'column', padding: '8px', width: '29%', border: '1px solid black', borderRadius: '4px', height: '388px',
                }}
                >
                  <div style={{
                    display: 'flex', flexDirection: 'column', height: '100%', fontSize: '20px', fontWeight: 'bold',
                  }}
                  >
                    <div style={{ margin: '8px 0px' }}>
                      <Icon size="small" style={{ margin: '4px' }} type="inbox" />
                      동아리 회의 투표권
                    </div>
                    <div style={{ margin: '8px 0px' }}>
                      <Icon size="small" style={{ margin: '4px' }} type="home" />
                      동방 재실권
                    </div>
                    <div style={{ margin: '8px 0px' }}>
                      <Icon size="small" style={{ margin: '4px' }} type="user-add" />
                      동게 프리미엄 계정
                    </div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    {/* <a href="https://cia.kw.ac.kr/wiki/index.php?title=%ED%9A%8C%EC%B9%99#.EC.A0.9C3.EC.A0.88_.EC.A0.95.ED.9A.8C.EC.9B.90"> */}
                    <a href="https://cafe.naver.com/ciapg523/62">
                      <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>회칙 보기</div>
                    </a>
                    <Button
                      onClick={() => this.onClickMethod()}
                      size="large"
                      icon="double-right"
                      style={{
                        fontSize: '14pt', fontWeight: 'bold', backgroundColor: '#1976D2', color: 'white',
                      }}
                    >
                      활동인구 등록하기!!
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    )
  }
}
Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
