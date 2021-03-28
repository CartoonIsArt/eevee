import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getMembers, logout } from '../actions'
import { Button, Icon, Menu, Modal } from 'antd'

class Userpage extends Component {
  constructor(props) {
    super(props)
    this.props.getMembers()
    this.state = {
      visible: false,
    }
  }

  static check(boolean) {
    if (boolean) {
      return <Icon type="check" />
    }
    return <Icon type="close" />
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  onLogout() {
    this.props.logout();
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
            <div className="menu">
              <Link to={`/members/${username}`}>작성한 글</Link>
            </div>
            <div className="menu">
              <Link to={`/members/${username}/comments`}>작성한 댓글</Link>
            </div>
            <div className="menu">
              <Link to={`/members/${username}/likes`}>좋아요한 글</Link>
            </div>
            <div className="menu last" onClick={() => this.props.history.push('/members')}>회원들</div>
            <div className="blank" />
            <Button className="menu-btn" type="dashed" onClick={() => this.props.history.push('/settings/account')}>
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
                  <p>기수</p>
                  <p>이름</p>
                  <p>학번</p>
                  <p>학과</p>
                  <p>활동인구</p>
                  <p>정회원</p>                  
                </div>
                {member.length > 0
                  && (
                  <div className="my-inform-value">                  
                    <p>{member[0].nTh}기</p>
                    <p>{member[0].fullname}</p>
                    <p>{member[0].studentNumber}</p>
                    <p>{member[0].major}</p>
                    <p>{Userpage.check(member[0].isActive)}</p>
                    <p>{Userpage.check(member[0].isRegular)}</p>   
                  </div>
                  )}
              </div>
            </div>
            <div style={{ position: "sticky", width: "100%", border:"solid 1px #d3d6db", top:"324px", marginTop :"12px"}}>
              <div style={{ fontSize: "12pt", backgroundColor: "#f6f7f9", padding: "12px", fontWeight: "bold", borderBottom: "solid 1px #d3d6db" }}>메뉴</div>
              <div>
                <Menu mode="inline">
                    <Menu.Item key="logout" onClick={() => this.showModal()}>
                      <Icon type="logout" />
                      <span>로그아웃</span>
                    </Menu.Item>
                    <Modal
                      title="로그아웃"
                      visible={this.state.visible}
                      onOk={() => this.onLogout()}
                      onCancel={() => this.hideModal()}
                    >
                      정말 로그아웃 하시겠습니까?
                    </Modal>
                </Menu>
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
  logout,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
