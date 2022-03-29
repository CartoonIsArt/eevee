import { Button, Card, Checkbox, Col, Empty, message, Popconfirm, Row } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import RegistrationListBoard from '../components/RegistrationListBoard'
import Loading from '../components/Loading'
import { patchMembers, getRegistrations, postEnrollment } from '../actions'
import { isEmptyObject } from '../lib'


class RegistrationApproval extends Component {
  state = {
    loading: false,
    registrations: [],
    unregistrations: [],
  }

  componentDidMount() {
    this.props.getRegistrations()
      .then(() => {
        let nextState = {
          loading: true,
          registrations: this.props.registrations.registrations,
          unregistrations: this.props.registrations.unregistrations,
        }
        this.setState(nextState)
      })
      .catch((e) => {
        message.error(`가입신청 정보들을 불러오는데 실패했습니다: ${e.message}`)
        this.setState({ loading: true })
      })
  }

  render() {
    const {
      loading,
      registrations,
      unregistrations,
    } = this.state

    return (
      <Card
        className="page-card"
        title={
          <Row type="flex" justify="space-between">
            <Col span={7}><span>가입신청 승인</span></Col>
            <Col sm={14} lg={10} xl={7}>
            </Col>
          </Row>
        }
      >
        <Loading loading={loading}>
          {!isEmptyObject(this.props.registrations)
            ? (
              <Row>
                <RegistrationListBoard
                  registrations={registrations}
                  unregistrations={unregistrations}
                />
              </Row>
            )
            : <Empty />
          }
        </Loading>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  registrations: state.registrations,
})
const mapDispatchToProps = ({
  patchMembers,
  getRegistrations,
  postEnrollment,
})

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationApproval)
