import React, { Component } from 'react'
import { Button } from 'antd'
import Activity from './Activity'

const value = {
  profileimg: 'https://cia.kw.ac.kr/media/fc5e1ce1-9077-4ded-9d81-ee639f66a45a.jpg',
  last_name: '13기 송민준',
  username: 'eksrns22tp',
  department: '컴퓨터공학과',
  nMemories: 1,
  nComments: 2,
  nLikes: 3,
}

class Profile extends Component {
  render() {
    return (
      <div style={{ height: '516px', outline: 'solid black 1px' }}>
        <div style={{ height: '320px' }} >
          <a className="ant-anchor-link-title" href="#">
            <img width="100%" src={value.profileimg} alt="profile" />
          </a>
        </div>
        <div style={{ height: '98px',
          display: 'flex',
          flexDirection: 'row',
          padding: '8px',
          lineHeight: '1rem' }}
        >
          <div style={{ width: '67%', fontSize: '18pt', textAlign: 'left' }}>
            <div style={{ height: '34%', fontWeight: 'bold' }} >
              {value.last_name}
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {value.username}
            </div>
            <div style={{ height: '33%', fontSize: '14pt' }}>
              {value.department}
            </div>
          </div>
          <div style={{ width: '33%' }}>
            <Button> 프로필 수정 </Button>
          </div>
        </div>
        <Activity />
      </div>
    )
  }
}

export default Profile
