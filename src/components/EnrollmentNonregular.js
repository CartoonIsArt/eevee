import { Button, Card, Divider, Icon, message, Result, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../fetches/axios'


class EnrollmentNonregular extends Component {
  state = {
    enrollment: {}
  }

  componentDidMount() {
    axios.get('/enrollment/current')
      .then((r) => {
        const { enrollment } = r.data
        this.setState({ enrollment })
      })
      .catch(() => message.error('활동인구 정보를 가져오는 데 실패했습니다.'))
  }

  enroll = () => {
    const { enrollment } = this.state

    if (!enrollment)
      return message.warning('활동인구 신청 기간이 아닙니다.')

    if (enrollment.enrollees.filter(enrollee => enrollee.id == this.props.account.id).length > 0)
      return message.warning('이미 신청했습니다.')

    axios.patch(`/enrollment/${enrollment.id}`)
      .then(() => message.success('활동인구 신청에 성공했습니다.'))
      .catch(() => message.error('활동인구 신청에 실패했습니다.'))
  }

  render() {
    return (
      <Card className="page-card">
        <Result
          title={<span className="enrollment-title">지금 활동인구를 신청해 보세요!</span>}
          extra={[
            <Button key="law" size="large">
              <Link to="/law"><span className="button-law">회칙 보러가기</span></Link>
            </Button>,
            <Button
              key="enroll"
              className="button-enroll"
              onClick={this.enroll}
              size="large"
            >
              활동인구 신청
            </Button>
          ]}
        >
          <Row className="row-advantage" type="flex" justify="center">
            <span>활동인구 혜택</span>
            <Divider />
          </Row>
          <Row className="row-advantage">
            <Icon className="icon-advantage" size="small" type="inbox" />동아리 회의 투표권
          </Row>
          <Row className="row-advantage">
            <Icon className="icon-advantage" size="small" type="home" />동방 재실권
          </Row>
          <Row className="row-advantage">
            <Icon className="icon-advantage" size="small" type="user-add" />동게 프리미엄 계정
          </Row>
        </Result>
      </Card>
    )
  }
}

EnrollmentNonregular.propTypes = {
  account: PropTypes.object.isRequired,
}

export default EnrollmentNonregular
