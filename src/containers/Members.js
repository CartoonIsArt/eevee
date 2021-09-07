import { Card, Col, Input, Row, Tabs } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMembers } from '../actions'
import Namecard from '../components/Namecard'


const { TabPane } = Tabs
const { Search } = Input

function searchResult(members, filter) {
  return members
    .filter((member) => `${member.student.nTh}기 ${member.student.name}`.includes(filter))
    .map((member) => (
      <Col className="col-members" key={member.id} flex={1}>
        <Namecard account={member} size="24rem" />
      </Col>
    ))
}

class Members extends Component {
  constructor(props) {
    super(props)
    this.state = {
      onLoad: false,
      filter: '',
    }
  }

  componentWillMount() {
    this.props.getMembers()
      .then(() => this.setState({ onLoad: true }))
  }

  setFilter(e) {
    this.setState({ filter: e.target.value })
  }

  render() {
    const { filter, onLoad } = this.state

    return (
      <Card id="members" className="page-card" title="회원목록">
        {onLoad && (
          <Tabs
            destroyInactiveTabPane={true}
            tabBarExtraContent={<Search onChange={(e) => this.setFilter(e)} />}
          >
            <TabPane tab="모든회원" key="all">
              <Row className="row-members" type="flex" justify="center">
                {searchResult(this.props.members, filter)}
              </Row>
            </TabPane>
            <TabPane tab="활동인구" key="act">
              <Row className="row-members" type="flex" justify="center">
                {searchResult(this.props.members.filter((member) => member.isActive), filter)}
              </Row>
            </TabPane>
          </Tabs>
        )}
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  members: state.members,
})
const mapDispatchToProps = ({
  getMembers,
})

export default connect(mapStateToProps, mapDispatchToProps)(Members)
