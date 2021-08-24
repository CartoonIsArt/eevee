import { Button, Card, message, Result } from 'antd'
import React, { Component } from 'react'


function showPassword() {
  message.info('동방 비밀번호')
}

class Doorlock extends Component {
  render() {
    return (
      <Card className="page-card">
        <Result
          status="warning"
          title="동방 비밀번호"
          subTitle="동아리 비회원/준회원에게 알려주면 안됩니다!"
          extra={
            <Button
              size="large"
              style={{ fontSize: '14pt' }}
              onClick={showPassword}
            >
              비밀번호 확인하기
            </Button>
          }
        />
      </Card>
    )
  }
}

export default Doorlock
