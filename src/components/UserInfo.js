import { Card, Descriptions, Icon } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isRegularMember } from '../lib'


function check(isRegular) {
  if (isRegular) return <Icon type="check" style={{ color: 'green' }} />
  return <Icon type="close" style={{ color: 'red' }} />
}

class UserInfo extends Component {
  render() {
    const { account } = this.props
    
    return (
      <Card title="유저 정보" size="small">
        <Descriptions column={1} size="small">
          <Descriptions.Item label="기수">{account.student.nTh}기</Descriptions.Item>
          <Descriptions.Item label="이름">{account.student.name}</Descriptions.Item>
          <Descriptions.Item label="학과">{account.student.major}</Descriptions.Item>
          <Descriptions.Item label="활동인구">{check(account.isActive)}</Descriptions.Item>
          <Descriptions.Item label="정회원">{check(isRegularMember(account))}</Descriptions.Item>
        </Descriptions>
      </Card>
    )
  }
}

UserInfo.propTypes = {
  account: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)
