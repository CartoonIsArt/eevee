import { Button, Cascader, Col, DatePicker, Input, Modal, Row } from 'antd'
import React, { useState } from 'react'


const { RangePicker } = DatePicker

const EnrollmentListTitle = ({
  enrollments,
  enrollmentTitle,
  onClick,
  onChangeDate,
  onChangeEnrollment
}) => {
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')

  return (
    <Row type="flex" justify="space-between">
      <Col span={7}><span>활동인구 수정</span></Col>
      <Col sm={14} lg={10} xl={7}>
        <Col span={8}>
          <Button size="small" onClick={() => setVisible(true)}>새로 만들기</Button>
        </Col>
        <Col span={16}>
          <Modal
            title="제목을 입력해주세요"
            closable={false}
            visible={visible}
            onOk={() => { onClick(title); setVisible(false); }}
            onCancel={() => setVisible(false)}
          >
            <Input
              placeholder="예) 2021학년도 2학기"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <RangePicker style={{ marginTop: "0.5em" }} onChange={onChangeDate} />
          </Modal>
          <Cascader
            size="small"
            placeholder="학기를 선택해주세요"
            value={[enrollmentTitle]}
            options={enrollments.map(x => ({ label: x.title, value: x.title }))}
            onChange={onChangeEnrollment}
          />
        </Col>
      </Col>
    </Row>
  )
}

export default EnrollmentListTitle
