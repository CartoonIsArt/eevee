import { Button, Card, Result } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class EnrollmentRegular extends Component {
  render() {
    return (
      <Card className="page-card">
        <Result
          status="success"
          title={<span className="enrollment-title">이미 활동인구입니다!</span>}
          subTitle={<span>활동인구 혜택을 맘껏 누리세요.<br />기간은 개강총회부터 종강총회까지입니다.</span>}
          extra={
            <Button className="button-enroll" size="large">
              <Link to="/">
                메인 페이지로
              </Link>
            </Button>
          }
        />
      </Card>
    )
  }
}
export default EnrollmentRegular
