import { Button, Card, Icon, Result } from 'antd'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class EnrollmentRegular extends Component {
  render() {
    return (
      <Card className="page-card">
        <Result
          status="success"
          title="활동인구 등록이 완료되었습니다!"
          subTitle="활동인구 혜택을 맘껏 누리세요. 활동인구 유효기간은 개강총회부터 종강총회까지 입니다."
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
