import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button } from 'antd'
import { getMembers } from '../../actions'

class Userpage extends Component {
  componentWillMount() {
    this.props.getMembers()
  }
  render() {
    const members = this.props.members
    const username = this.props.match.params.username
    const member = members.length > 0 ? members.filter(m => m.username === username) : []
    const myMenu = {
      color: '#365899', float: 'left', height: '44px', padding: '0px 16px', fontSize: '16px', textAlign: 'center', borderRight: '1px solid #e9eaed',
    }
    return (
      <div style={{
        height: '1040px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
      }}
      >
        <div style={{ height: '252px', border: '1px solid #e9eaed', margin: '12px' }}>
          <div style={{ height: '208px', backgroundImage: "url('https://s20.postimg.org/m5mwyzknh/53e2909f.jpg')", backgroundPosition: 'center 30%' }}>
            <div style={{
              border: 'solid 4px white',
              width: '208px',
              height: '208px',
              borderRadius: '104px',
              position: 'relative',
              left: '44px',
              top: '48px',
              zIndex: '2',
              overflow: 'hidden',
            }}
            >
              <img src="https://i.imgur.com/tAxNVWy.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="bg-img" />
            </div>
          </div>
          <div style={{ position: 'relative', height: '44px', border: 'solid 1px #e9eaed', paddingLeft: '280px' }}>
            <ul style={{ width: '100%', lineHeight: '2.4', fontSize: '12pt' }}>
              <li><a href="" style={myMenu}>내가쓴글</a></li>
              <li><a href="" style={myMenu}>좋아요 누른글</a></li>
              <li><a href="" style={myMenu}>댓글단 글</a></li>
              <li><a href="/members" style={myMenu}>회원들</a></li>
              <Button type="dashed" style={{ inline: '2.4', fontSize: '12pt', marginLeft: '220px' }}>
                프로필 수정
              </Button>
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', border: 'solid 1px #e9eaed', margin: '12px' }}>
          <div style={{ display: 'flex', width: '20%', padding: '16px', border: 'solid 1px #e9eaed', margin: '12px 0px 12px 12px' }}>
            <div style={{ width: '30%', textAlign: 'center', marginRight: '24px' }}>
              기수<br />
              이름<br />
              학번<br />
              학과<br />
              활동인구<br />
              정회원<br />
            </div>
            {member.length > 0 &&
              <div style={{ width: '70%' }}>
                {member[0].last_name}<br />
                {member[0].last_name}<br />
                {member[0].student_number}<br />
                {member[0].department}<br />
                {member[0].isActivated}<br />
                {member[0].isRegularMember}
              </div>
            }
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', border: 'solid 1px #e9eaed', margin: '12px' }}>
            <div style={{ padding: '12px', borderBottom: 'solid 1px #e9eaed' }}>
              내가 쓴글
            </div>
            <div>
              글글
            </div>
          </div>
        </div>
        {this.props.match.params.username}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Userpage))
