import { Affix, Col, Icon, Menu, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getAccount } from '../actions'
import { isRegularMember } from '../lib'


const { SubMenu } = Menu

class Sider extends Component {
  static getAncestorKeys(key) {
    const map = {
      sub1: ['/enrollment'],
      sub2: ['/notifications'],
    };
    return map[key] || [];
  }

  constructor(props) {
    super(props)
    this.state = {
      openKeys: [],
    }
    this.props.getAccount()
  }

  onOpenChange(openKeys) {
    const { state } = this;
    const latestOpenKey = openKeys.find((key) => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find((key) => !(openKeys.indexOf(key) > -1));

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
    const { history } = this.props
    history.push(e.key)
  }

  render() {
    const { account, isNavigationMenu } = this.props
    const { pathname } = this.props.location
    const xsSpan = isNavigationMenu ? 24 : 0

    return (
      <Row id="sider">
        <Col xs={xsSpan} md={24}>
          <Affix offsetTop={49}>
            <Menu
              mode="inline"
              openKeys={this.state.openKeys}
              selectedKeys={[pathname]}
              style={{ width: '240px' }}
              onOpenChange={(openKeys) => this.onOpenChange(openKeys)}
              onClick={(e) => this.handleClick(e)}
            >
              <Menu.Item key="/enrollment">
                <Icon type="appstore" />
                <span>활동인구 등록</span>
              </Menu.Item>
              {/* 배포후 패치해도 되는 내용
              <SubMenu
                key="sub2"
                title={
                  <span><Icon type="notification" /><span>공지사항</span></span>}
              >
                <Menu.Item key="/notifications">공지사항</Menu.Item>
                <Menu.Item key="/accounting">회비미납자</Menu.Item>
                <Menu.Item key="/cleaning">청소조</Menu.Item>
              </SubMenu>
              */}
              <Menu.Item key="/members">
                <Icon type="team" />
                <span>회원들</span>
              </Menu.Item>
              <SubMenu
                key="sub5"
                title={(
                  <span>
                    <Icon type="smile" />
                    <span>C.I.A.</span>
                  </span>
                )}
              >
                <Menu.Item key="/law">
                  <span>회칙</span>
                </Menu.Item>
                { isRegularMember(account) && <Menu.Item key="/doorlock">동방 비밀번호</Menu.Item>
                  /* 배포 후 패치
                  <Menu.Item key="/old/noties">(구) 공지</Menu.Item>
                  <Menu.Item key="/old/texts"> (구) 자유</Menu.Item>
                  */
                }
              </SubMenu>
              {
                account.role === "superuser"
                && (
                <SubMenu
                  key="sub6"
                  title={(
                    <span>
                      <Icon type="tool" />
                      <span>임원진 도구</span>
                    </span>
                  )}
                >
                  <Menu.Item key="/reset-active-members">활동인구 초기화</Menu.Item>
                </SubMenu>
                )
              }
            </Menu>
          </Affix>
        </Col>
      </Row>
    );
  }
}

Sider.PropTypes = {
  isNavigationMenu: PropTypes.bool,
}

Sider.defaultProps = {
  isNavigationMenu: false,
}

const mapStateToProps = (state) => ({
  router: state.router,
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sider))
