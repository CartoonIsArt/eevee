import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Regulared from '../components/Regulared'
import axios from '../fetches/axios'
import { getAccount } from '../actions'
import { Button, Icon, Modal } from 'antd'

const isEnrollmentPeriod = false;// 나중에 날짜비교하기

class Enrollment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      responses: [],
      account: [],
    }
  }

  onClickMethod() {
    // 날짜 비교
    if (isEnrollmentPeriod) {
      const { account } = this.props
      if (account.account === undefined) { this.props.getAccount() }
      const args = { isActive: true }
      // 활동인구 patch를 추가하든가 해야될듯, 기존 patchOne은 passward필요
      axios.patch(`/account/${account.id}`, args)
        .then((r) => {
          this.props.getAccount()
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
    } else {
      Modal.warning({ title: '활동인구 등록기간이 아닙니다.' })
    }
  }

  render() {
    return (
      <div>
        {this.props.account.isActive
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
                  <img src="/images/enrollment.jpg" alt="활동인구" />
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
                    <Link to="/law">
                      <div style={{ fontSize: '14pt', fontWeight: 'bold' }}>회칙 보기</div>
                    </Link>
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
Enrollment.propTypes = {
  account: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default connect(mapStateToProps, mapDispatchToProps)(Enrollment)
