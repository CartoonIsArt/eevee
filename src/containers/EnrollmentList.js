import { Button, Card, Checkbox, Col, Empty, message, Popconfirm, Row } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import EnrollmentListBoard from '../components/EnrollmentListBoard'
import EnrollmentListTitle from '../components/EnrollmentListTitle'
import Loading from '../components/Loading'
import { patchMembers, getEnrollments, postEnrollment } from '../actions'
import { mergeObject, canEditEnrollment } from '../lib'


class EnrollmentList extends Component {
  state = {
    loading: false,
    disable: true,
    canEdit: true,
    indeterminate: true,
    checkAll: false,
    enrollments: [],
    currentEnrollment: null,
    actives: [],
    disables: [],
    rangeDate: null,
  }

  componentDidMount() {
    this.props.getEnrollments()
      .then(() => {
        let nextState = {
          loading: true,
          enrollments: this.props.enrollments,
        }

        if (nextState.enrollments.length > 0) {
          const canEdit = canEditEnrollment(nextState.enrollments[0])
          const actives = nextState.enrollments[0].enrollees
            .filter(enrollee => enrollee.isActive)
            .map(active => active.id)

          nextState = mergeObject(nextState, {
            canEdit,
            disable: !canEdit,
            currentEnrollment: nextState.enrollments[0],
            actives,
            disables: actives,
          })
        }
        this.setState(nextState)
      })
  }

  makeNewEnrollment = (title) => {
    const formData = {
      title,
      startDate: this.state.rangeDate[0],
      endDate: this.state.rangeDate[1],
    }
    this.props.postEnrollment(formData)
      .then(() => {
        const currentEnrollment = this.props.enrollments[0]
        const canEdit = canEditEnrollment(currentEnrollment)

        this.setState({
          canEdit,
          disable: !canEdit,
          enrollments: this.props.enrollments,
          currentEnrollment,
          actives: [],
          disables: [],
        })
      })
  }

  onChangeDate = (_, rangeDate) => {
    this.setState({ rangeDate })
  }

  onChangeEnrollment = (value) => {
    if (value.length <= 0) return
    const currentEnrollment = this.state.enrollments.find(x => x.title === value[0])
    const canEdit = canEditEnrollment(currentEnrollment)
    const actives = currentEnrollment.enrollees
      .filter(enrollee => enrollee.isActive)
      .map(active => active.id)

    this.setState({
      canEdit,
      disable: !canEdit || this.state.disable,
      currentEnrollment,
      actives,
      disables: actives,
    })
  }

  checkActive = (actives) => {
    this.setState({
      indeterminate: !!actives.length
        && actives.length < this.state.currentEnrollment.enrollees.length,
      checkAll: actives.length === this.state.currentEnrollment.enrollees.length,
      actives,
    })
  }

  checkAllActive = (e) => {
    this.setState({
      indeterminate: false,
      checkAll: e.target.checked,
      actives: e.target.checked
        ? this.state.currentEnrollment.enrollees.map(active => active.id)
        : this.state.disables.filter(() => this.state.disable),
    })
  }

  toggleDisable = () => {
    const canEdit = canEditEnrollment(this.state.currentEnrollment)
    const disable = !canEdit || !this.state.disable

    this.setState({
      canEdit,
      disable,
      actives: disable
        ? Array.from(new Set([...this.state.disables, ...this.state.actives]))
        : this.state.actives,
    })
  }
  
  activate = () => {
    const formData = {
      actives: this.state.actives,
      inactives: this.state.currentEnrollment.enrollees
        .filter(enrollee => !this.state.actives.includes(enrollee.id))
        .map(inactive => inactive.id),
    }

    this.props.patchMembers(formData)
      .then(() => this.props.getEnrollments()
        .then(() => {
          let nextState = {
            enrollments: this.props.enrollments,
          }
  
          if (nextState.enrollments.length > 0) {
            const actives = nextState.enrollments[0].enrollees
              .filter(enrollee => enrollee.isActive)
              .map(active => active.id)
  
            nextState = mergeObject(nextState, {
              currentEnrollment: nextState.enrollments[0],
              actives,
              disables: actives,
            })
          }
          this.setState(nextState)
          message.success('활동인구가 수정되었습니다!')
        })
        .catch((e) => {
          message.error(`활동인구 수정에 실패했습니다: ${e.message}`)
        })
      )
  }

  render() {
    const {
      loading,
      disable,
      canEdit,
      indeterminate,
      checkAll,
      enrollments,
      currentEnrollment,
      actives,
      disables,
    } = this.state

    return (
      <Card
        className="page-card"
        title={
          <EnrollmentListTitle
            enrollments={enrollments}
            enrollmentTitle={currentEnrollment && currentEnrollment.title}
            onClick={this.makeNewEnrollment}
            onChangeDate={this.onChangeDate}
            onChangeEnrollment={this.onChangeEnrollment}
          />
        }
      >
        <Loading loading={loading}>
          {currentEnrollment
            ? (
              <Row>
                <EnrollmentListBoard
                  disable={disable}
                  enrollees={currentEnrollment.enrollees}
                  candidates={currentEnrollment.candidates}
                  actives={actives}
                  disables={disables}
                  checkActive={this.checkActive}
                />
                <Row id="enrollment-list-footer" type="flex" align="middle" justify="center" gutter={[20, 0]}>
                  <Col>
                    <Checkbox disabled={!canEdit} checked={!disable} onChange={this.toggleDisable}>
                      <span>기존 멤버 수정</span>
                    </Checkbox>
                  </Col>
                  <Col>
                    <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={this.checkAllActive}>
                      <span>모두 선택</span>
                    </Checkbox>
                  </Col>
                  <Col>
                    <Popconfirm
                      title="활동인구를 수정합니다."
                      onConfirm={this.activate}
                      okText="확인"
                      cancelText="취소"
                    >
                      <Button icon="edit" disabled={!canEdit}>수정하기</Button>
                    </Popconfirm>
                  </Col>
                </Row>
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
  enrollments: state.enrollments,
})
const mapDispatchToProps = ({
  patchMembers,
  getEnrollments,
  postEnrollment,
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentList)
