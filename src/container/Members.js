import { Card, Col, Input, Row, Tabs } from 'antd'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMembers } from '../actions'
import Namecard from '../components/Namecard'


const { TabPane } = Tabs
const { Search } = Input

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
      <Card id="members" title="회원목록">
        {onLoad
          && (
            <Tabs
              tabBarExtraContent={<Search onChange={(e) => this.setFilter(e)} />}
            >
              <TabPane tab="모든회원" key="all">
                <Row className="row-members" type="flex" justify="center">
                  {this.props.members
                    .filter((member) => `${member.nTh}기 ${member.fullname}`.includes(filter))
                    .map((member) => (
                      <Col className="col-members" key={member.id}>
                        <Namecard account={member} size="240px" />
                      </Col>
                    ))}
                </Row>
              </TabPane>
              <TabPane tab="활동인구" key="act">
                <Row className="row-members" type="flex" justify="center">
                  {this.props.members
                    .filter((member) => member.isActive && `${member.nTh}기 ${member.fullname}`.includes(filter))
                    .map((member) => (
                      <Col className="col-members" key={member.id}>
                        <Namecard account={member} size="240px" />
                      </Col>
                    ))}
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
