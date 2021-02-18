import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUser } from '../actions'

const SubMenu = Menu.SubMenu;

class Sider extends Component {
  static getAncestorKeys(key) {
    const map = {
      sub1: ['/dashboard'],
      sub2: ['/noties'],
    };
    return map[key] || [];
  }
  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
    }
  }
  componentWillMount() {
    /*
    if (this.props.user.has_logged_in === false) {
      this.props.getUser()
    }
    */
  }
  onOpenChange(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = Sider.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = Sider.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  handleClick(e) {
    const history = this.props.history
    history.push(e.key)
  }
  render() {
    const user = this.props.user
    const loc = this.props.location
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[loc]}
        style={{ width: 240, minHeight: '100vh' }}
        onOpenChange={openKeys => this.onOpenChange(openKeys)}
        onClick={e => this.handleClick(e)}
      >
        {user.has_logged_in ?
          <div style={{ height: '240px', overflow: 'hidden' }}>
            <img
              src={user.profileImage.savedPath}
              alt={user.profileImage.filename}
              width="100%"
            />
          </div> :
          this.props.getUser() /* :
          <div style={{ height: '240px', background: 'black' }} /> */
        }
        {
          user.isActivated ||
          <SubMenu
            key="sub1"
            title={
              <span><Icon type="appstore" /><span>대시보드</span></span>}
          >
            <Menu.Item key="/dashboard">대시보드</Menu.Item>
          </SubMenu>
        }
        {/* 배포후 패치해도 되는 내용
        <SubMenu
          key="sub2"
          title={
            <span><Icon type="notification" /><span>공지사항</span></span>}
        >
          <Menu.Item key="/noties">공지사항</Menu.Item>
          <Menu.Item key="/accounting">회비미납자</Menu.Item>
          <Menu.Item key="/cleaning">청소조</Menu.Item>
        </SubMenu>
        */}
        <SubMenu
          key="sub4"
          title={
            <span><Icon type="team" /><span>회원들</span></span>}
        >
          <Menu.Item key="/members">회원들</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          title={
            <span><Icon type="smile" /><span>C.I.A.</span></span>}
        >
          <Menu.Item key="/law">
            {/* <a href="https://cia.kw.ac.kr/wiki/index.php?title=%ED%9A%8C%EC%B9%99" target="_blank" rel="noopener noreferrer">회칙</a> */}
            <a href="https://cafe.naver.com/ciapg523/62" target="_blank" rel="noopener noreferrer">회칙</a>
          </Menu.Item>
          <Menu.Item key="/doorlock">동방 비밀번호</Menu.Item>
          {/* 배포 후 패치
          <Menu.Item key="/old/noties">(구) 공지</Menu.Item>
          <Menu.Item key="/old/texts"> (구) 자유</Menu.Item>
          */}
        </SubMenu>
        {
          user.isSuperUser &&
          <SubMenu
            key="sub6"
            title={<span><Icon type="tool" /><span>임원진 도구</span></span>}
          >
            <Menu.Item key="/deactivate">활동인구 초기화</Menu.Item>
          </SubMenu>
        }
        <SubMenu
          key="sub7"
          title={<span><Icon type="frown" /><span>로그아웃</span></span>}
        >
          <Menu.Item key="/logout">로그아웃</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  router: state.router,
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
})


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sider))
