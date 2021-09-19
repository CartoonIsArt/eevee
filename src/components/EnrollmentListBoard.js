import { Avatar, Card, Checkbox, Col, List, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Center from '../components/Center'
import NameTag from '../components/NameTag'


class EnrollmentRegular extends Component {
  render() {
    const { disable, enrollees, candidates, actives, disables, checkActive } = this.props

    return (
      <Row type="flex" justify="space-around" gutter={[0, 20]}>
        <Col>
          <Card className="board-card" size="small" title={<Center>활동인구 미신청 목록</Center>}>
            <Checkbox.Group onChange={checkActive}>
              <List
                itemLayout="horizontal"
                dataSource={candidates}
                renderItem={candidate => (
                  <List.Item actions={[
                    <Checkbox value={candidate.id} disabled>
                      <span>활동인구</span>
                    </Checkbox>
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar src={candidate.profile.profileImage} />}
                      title={<NameTag nameOnly account={candidate} />}
                    />
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Card>
        </Col>
        <Col>
          <Card className="board-card" size="small" title={<Center>활동인구 신청 목록</Center>}>
            <Checkbox.Group value={actives} onChange={checkActive}>
              <List
                itemLayout="horizontal"
                dataSource={enrollees}
                renderItem={enrollee => (
                  <List.Item actions={[
                    <Checkbox value={enrollee.id} disabled={disable && disables.includes(enrollee.id)}>
                      <span>활동인구</span>
                    </Checkbox>
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar src={enrollee.profile.profileImage} />}
                      title={<NameTag nameOnly account={enrollee} />}
                    />
                  </List.Item>
                )}
              />
            </Checkbox.Group>
          </Card>
        </Col>
      </Row>
    )
  }
}

EnrollmentRegular.propTypes = {
  disable: PropTypes.bool.isRequired,
  enrollees: PropTypes.array.isRequired,
  candidates: PropTypes.array.isRequired,
  actives: PropTypes.array.isRequired,
  disables: PropTypes.array.isRequired,
  checkActive: PropTypes.func.isRequired,
}

export default EnrollmentRegular
