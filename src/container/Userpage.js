import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getMembers } from '../actions'
import PropTypes from 'prop-types'

const Button = require('antd/lib/button')
const Icon = require('antd/lib/icon')

class Userpage extends Component {
  constructor(props) {
    super(props)
    this.props.getMembers()
  }
  static check(boolean) {
    if (boolean) {
      return <Icon type="check" />
    }
    return <Icon type="close" />
  }

  render() {
    // 유저 페이지 넘길 때, props로 유저 아이디 넘기면 좋을 듯합니다
    const { members } = this.props
    const { username } = this.props.match.params
    const member = members.length > 0 ? members.filter((m) => m.username === username) : []
    return (
      <div className="userpage">
        <div className="header">
          <div className="background-image">
            <div className="user-profile">
              <img className="profile-image-size" src="https://i.imgur.com/tAxNVWy.jpg" alt="Profile-img" />
            </div>
          </div>
          <div className="menu-bar">
            <div className="menu"><a href="">작성한 글</a></div>
            <div className="menu"><a href="">좋아요한 글</a></div>
            <div className="menu"><a href="">댓글단 글</a></div>
            <div className="menu last" onClick={()=>this.props.history.push('/members')}>회원들</div>
            <div className="blank" />
            <Button className="menu-btn" type="dashed" onClick={()=>this.props.history.push('/settings/account')}>
              <Icon type="tool" />
              {' '}
              프로필 수정
            </Button>
          </div>
        </div>
        <div className="under-board">
          <div className="my-inform-size">
            <div className="my-inform-board">
              <div className="my-inform-title">
                <Icon type="user" />
                {' '}
                유저 정보
              </div>
              <div className="my-inform-content">
                <div className="my-inform-key">
                  <ol>
                    <li>기수</li>
                    <li>이름</li>
                    <li>학번</li>
                    <li>학과</li>
                    <li>활동인구</li>
                    <li>정회원</li>
                  </ol>
                </div>
                {member.length > 0
                  && (
                  <div className="my-inform-value">
                    <ol>
                      <li>{member[0].nTh}기</li>
                      <li>{member[0].fullname}</li>
                      <li>{member[0].studentNumber}</li>
                      <li>{member[0].major}</li>
                      <li>{Userpage.check(member[0].isActive)}</li>
                      <li>{Userpage.check(member[0].isRegular)}</li>
                    </ol>
                  </div>
                  )}
              </div>
            </div>
          </div>
          <div className="my-write-size">
            <div className="my-write-title">
              <Icon type="edit" />
              {' '}
              작성한 글
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px' }}>
              <div style={{ display: 'block' }}>
                <div style={{ display: 'flex', marginBottom: '8px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '8px',
                    overflow: 'hidden',
                  }}
                  >
                    <img src="https://i.imgur.com/tAxNVWy.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="Profile-img" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16pt' }}>19기 심심한 바보</p>
                    <p>2017년 10월 4일 오후 11시 22분</p>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '12pt' }}>
                추석 연휴 아니었음 진짜 손도 안댔다...
                <div style={{ display: 'block' }}>
                  <img src="https://i.imgur.com/OwKtSaK.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="HK 416" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Userpage.propTypes = {
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  members: state.members,
})
const mapDispatchToProps = ({
  getMembers,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
