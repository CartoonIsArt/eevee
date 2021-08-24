import { Button, Card, Divider, Icon, Modal, Result, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../fetches/axios'


const isEnrollmentPeriod = false  // 나중에 날짜비교하기

class EnrollmentNonregular extends Component {
  enroll() {
    if (!isEnrollmentPeriod)
      return Modal.warning({ title: '활동인구 등록기간이 아닙니다.' })

    const formData = this.props.account

    // 활동인구 patch를 추가하든가 해야될듯, 기존 patchOne은 passward필요
    axios.patch(`/account/${this.props.account.id}`, formData)
      .catch(() => Modal.warning({ title: '활동인구 등록에 실패했습니다.' }))
      // .catch((e) => Modal.warning({ title: e.message }))
  }

  render() {
    return (
      <Card className="enrollment">
        <Result
          title="지금 활동인구에 등록해 보세요!"
          extra={[
            <Button size="large">
              <Link to="/law"><span className="button-law">회칙 보러가기</span></Link>
            </Button>,
            <Button
              className="button-enroll"
              onClick={() => this.enroll()}
              size="large"
            >
              활동인구 등록
            </Button>
          ]
          }
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
