import { Button, Card, Popconfirm } from 'antd'
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
        {this.props.canEdit && (
          <Link to="/settings/account">
            <Button icon="tool">
              <span>프로필 수정</span>
            </Button>
          </Link>
        )}
        <Popconfirm
          title="정말 로그아웃 하시겠습니까?"
          onConfirm={this.onLogout}
          okText="로그아웃"
          cancelText="취소"
        >
          <Button icon="logout">로그아웃</Button>
        </Popconfirm>
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
