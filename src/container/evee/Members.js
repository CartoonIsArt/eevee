import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Input } from 'antd'
import { getMembers } from '../../actions'
import Namecard from '../blacky/Namecard'

const TabPane = Tabs.TabPane
const Search = Input.Search

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
      // .then(() => this.setState({ onLoad: true}))
    this.setState({ onLoad: true })
  }
  render() {
    const {
      filter,
      onLoad,
    } = this.state
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '1000px', margin: '0px 8px', padding: '0px 20px', background: '#FFFFFF' }}>
        <div style={{ height: '5%' }} onClick={() => this.setState({ onLoad: true })}>
          <h1> 회원목록 </h1>
        </div>
        {onLoad &&
          <Tabs
            tabBarExtraContent={
              <Search onChange={e => this.setState({ filter: e.target.value })} />}
          >
            <TabPane tab="모든회원" key="all">
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {this.props.members
                  .filter(member =>
                      member.last_name.includes(filter) ||
                      member.username.includes(filter))
                  .map(member =>
                  (<div key={member.id} style={{ margin: '8px', padding: '8px', border: 'solid 1px #76c2ff', borderRadius: '4px' }}>
                    <Namecard content={member} width="240px" />
                  </div>),
                )}
              </div>
            </TabPane>
            <TabPane tab="활동인구" key="act">
              {this.props.members
                .filter(member =>
                    member.isActive &&
                     (member.last_name.includes(filter) ||
                      member.username.includes(filter)))
                .map(member =>
                (<div key={member.id} style={{ margin: '8px', padding: '8px', border: 'solid 1px #76c2ff', borderRadius: '4px' }}>
                  <Namecard content={member} width="240px" />
                </div>),
                )}
            </TabPane>
          </Tabs>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  members: state.members,
})
const mapDispatchToProps = ({
  getMembers,
})

export default connect(mapStateToProps, mapDispatchToProps)(Members)
