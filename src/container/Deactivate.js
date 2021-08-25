import { Button, Card, message, Popconfirm, Result } from 'antd'
import React, { Component } from 'react'


function confirm() {
  message.success('활동인구가 초기화되었습니다.')
}

function cancel() {
  message.info('취소했습니다.')
}

class Deactivate extends Component {
  render() {
    return (
      <Card className="page-card">
        <Result
          status="warning"
          title="주의!"
          subTitle="이 버튼을 잘못 누르면 모두가 개고생을 하게 됩니다."
          extra={
            <Popconfirm
              title="정말정말 초기화하시겠습니까?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="초기화"
              cancelText="취소"
              okType="danger"
            >
              <Button
                type="danger"
                size="large"
                style={{ fontSize: '14pt' }}
              >
                활동인구 초기화하기
              </Button>
            </Popconfirm>
          }
        />
      </Card>
    )
  }
}

export default Deactivate
