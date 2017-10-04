import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Icon } from 'antd'
import { getMembers } from '../../actions'

class Userpage extends Component {
  componentWillMount() {
    this.props.getMembers()
  }
  check(boolean) {
      if(boolean){
          <Icon type="check" />
      }
      else{
          <Icon type="close" />
      }
  }
  render() {
    const members = this.props.members
    const username = this.props.match.params.username
    const member = members.length > 0 ? members.filter(m => m.username === username) : []
    const myMenu = {
      color: '#365899', float: 'left', height: '44px', padding: '0px 16px', fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', borderRight: '1px solid #e9eaed',
    }
    return (
      <div style={{
        height: '1040px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <div style={{ height: '280px', border: '1px solid #d3d6db', margin: '12px', backgroundColor:'#fff' }}>
          <div style={{ height: '236px', backgroundImage: "url('https://i.imgur.com/RcuU2lm.png')", backgroundPosition: 'center 30%' }}>
            <div style={{
              border: 'solid 4px white',
              width: '208px',
              height: '208px',
              borderRadius: '50%',
              position: 'relative',
              left: '44px',
              top: '76px',
              zIndex: '2',
              overflow: 'hidden',
            }}
            >
              <img src="https://i.imgur.com/tAxNVWy.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="Profile-img" />
            </div>
          </div>
          <div style={{ position: 'relative', height: '44px', paddingLeft: '340px' }}>
            <ul style={{ width: '100%', lineHeight: '2.4', fontSize: '12pt' }}>
              <li><a className="menu" href="" style={myMenu}>내가쓴글</a></li>
              <li><a className="menu" href="" style={myMenu}>좋아요 누른글</a></li>
              <li><a className="menu" href="" style={myMenu}>댓글단 글</a></li>
              <li><a className="menu" href="/members" style={myMenu}>회원들</a></li>
              <Button type="dashed" style={{ inline: '2.4', fontSize: '12pt', marginLeft: '372px' }}>
                <Icon type="tool" /> 프로필 수정
              </Button>
            </ul>
          </div>
        </div>
        <div style={{ display: 'flex', margin: '12px', fontSize: '10pt' }}>
          <div style={{ display: 'block', width: '20%'}}>
            <div style={{ position: 'sticky', top: '52px', display: 'flex', flexDirection: 'column', backgroundColor:'#fff', border: 'solid 1px #d3d6db', }}>
              <div style={{ fontSize: '12pt' ,backgroundColor: '#f6f7f9', padding: '12px', fontWeight: 'bold', borderBottom: 'solid 1px #d3d6db', }}><Icon type="user" /> 내 정보</div>
              <div style={{ display: 'flex', padding: '8px'  }}>
                <div style={{ width: '36%', textAlign: 'center', marginRight: '24px' }}>
                  <ol>
                    <li style={{ margin: '8px 0px' }}>기수</li>
                    <li style={{ margin: '8px 0px' }}>이름</li>
                    <li style={{ margin: '8px 0px' }}>학번</li>
                    <li style={{ margin: '8px 0px' }}>학과</li>
                    <li style={{ margin: '8px 0px' }}>활동인구</li>
                    <li style={{ margin: '8px 0px' }}>정회원</li>
                  </ol>
                </div>
                {member.length > 0 &&
                  <div style={{ width: '64%' }}>
                    <ol>
                      <li style={{ margin: '8px 0px' }}>{member[0].last_name}</li>
                      <li style={{ margin: '8px 0px' }}>{member[0].last_name}</li>
                      <li style={{ margin: '8px 0px' }}>{member[0].student_number}</li>
                      <li style={{ margin: '8px 0px' }}>{member[0].department}</li>
                      <li style={{ margin: '8px 0px' }}>{this.check(member[0].isActivated)}</li>
                      <li style={{ margin: '8px 0px' }}>{this.check(member[0].isRegularMember)}</li>
                    </ol>
                  </div>
                }
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '100%', border: 'solid 1px #d3d6db', marginLeft: '12px', backgroundColor:'#fff' }}>
            <div style={{ padding: '12px', borderBottom: 'solid 1px #d3d6db', backgroundColor: '#f6f7f9', fontSize: '12pt', fontWeight: 'bold' }}>
              <Icon type="edit" /> 내가 쓴글
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', padding: '12px' }}>
              <div style={{ display: 'block'}}>
                <div style={{ display: 'flex', marginBottom: '8px'}}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    position: 'relative',
                    marginRight: '8px',
                    overflow: 'hidden',
                  }}
                  >
                    <img src="https://i.imgur.com/tAxNVWy.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="Profile-img" />
                  </div>
                  <div>
                    <p style={{ fontSize: '16pt' }}>19기 심심한 바보</p>
                    <p>2017년 10월 4일 오후 11시 22분</p>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: '12pt' }}>
                추석 연휴 아니었음 진짜 손도 안댔다...
                <div style={{ display: 'block' }}>
                  <img src="https://i.imgur.com/OwKtSaK.jpg" style={{ maxWidth: '100%', height: 'auto' }} alt="HK 416"/>
                </div>
              </div>
            </div>
          </div>
        </div>
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
