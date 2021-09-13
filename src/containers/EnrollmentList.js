import { Avatar, Button, Card, Checkbox, Col, List, message, Popconfirm, Row } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'
import NameTag from '../components/NameTag'
import { getMembers, patchMembers } from '../actions'


class EnrollmentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      disable: true,
      indeterminate: true,
      checkAll: false,
      actives: [],
      disables: [],
    }
    this.props.getMembers()
      .then(() => {
        const actives = this.props.members
          .filter(member => member.isActive)
          .map(active => active.id)

        this.setState({
          loading: true,
          actives,
          disables: actives,
        })
      })
  }

  checkActive = (actives) => {
    this.setState({
      indeterminate: !!actives.length && actives.length < this.props.members.length,
      checkAll: actives.length === this.props.members.length,
      actives,
    })
  }

  checkAllActive = (e) => {
    this.setState({
      indeterminate: false,
      checkAll: e.target.checked,
      actives: e.target.checked
        ? this.props.members.map(active => active.id)
        : this.state.disables.filter(() => this.state.disable),
    })
  }

  toggleDisable = () => {
    this.setState({
      disable: !this.state.disable,
      actives: !this.state.disable
        ? Array.from(new Set([...this.state.disables, ...this.state.actives]))
        : this.state.actives,
    })
  }
  
  activate = () => {
    const formData = {
      actives: this.state.actives,
      inactives: this.props.members
        .filter(member => !this.state.actives.includes(member.id))
        .map(inactive => inactive.id),
    }

    this.props.patchMembers(formData)
      .then(() => {
        const actives = this.props.members
          .filter(member => member.isActive)
          .map(active => active.id)

        this.setState({
          actives,
          disables: actives,
        })
        message.success('활동인구가 수정되었습니다!')
      })
      .catch((e) => {
        message.error(`활동인구 수정에 실패했습니다: ${e.message}`)
      })
  }

  render() {
    const { loading, disable, indeterminate, checkAll, actives, disables } = this.state

    return (
      <Card className="page-card" title="활동인구 수정">
        <Loading loading={loading}>
          <Row type="flex" justify="center">
            <Checkbox.Group value={actives} onChange={this.checkActive}>
              <List
                itemLayout="horizontal"
                dataSource={this.props.members}
                renderItem={member => (
                  <List.Item actions={[
                    <Checkbox value={member.id} disabled={disable && disables.includes(member.id)}>
                      <span>활동인구</span>
                    </Checkbox>
                  ]}>
                    <List.Item.Meta
                      avatar={<Avatar src={member.profile.profileImage} />}
                      title={<NameTag nameOnly account={member} />}
                    />
                  </List.Item>
                )}
              >
              </List>
            </Checkbox.Group>
          </Row>
          <Row type="flex" align="middle" justify="center" gutter={[20, 0]}>
            <Col>
              <Checkbox checked={!disable} onChange={this.toggleDisable}>
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
                <Button icon="edit">수정하기</Button>
              </Popconfirm>
            </Col>
          </Row>
        </Loading>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  account: state.account,
  members: state.members,
})
const mapDispatchToProps = ({
  getMembers,
  patchMembers,
})

export default connect(mapStateToProps, mapDispatchToProps)(EnrollmentList)
