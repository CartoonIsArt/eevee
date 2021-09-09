import { Button, Card, Col, Popconfirm, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { logout } from '../actions'


class UserMenu extends Component {
  onLogout = () => {
    this.props.logout()
  }
  
  render() {
    return (
      <Card title="메뉴" size="small">
        <Row gutter={[0, 12]}>
          <Col span={24}>
            {this.props.canEdit && (
              <Link to="/settings/account">
                <Button icon="tool" style={{ width: "13rem" }}>
                  <span>프로필 수정</span>
                </Button>
              </Link>
            )}
          </Col>
          <Col span={24}>
            <Popconfirm
              title="정말 로그아웃 하시겠습니까?"
              onConfirm={this.onLogout}
              okText="로그아웃"
              cancelText="취소"
            >
              <Button icon="logout" style={{ width: "13rem" }}>로그아웃</Button>
            </Popconfirm>
          </Col>
        </Row>
      </Card>
    )
  }
}

UserMenu.propTypes = {
  canEdit: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  logout,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserMenu))
