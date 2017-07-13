import React, { Component } from 'react'
import { Button, Input } from 'antd'

class Write extends Component {
  render() {
    const user = this.props.user
    return (
      <div style={{ marginBottom: '4px', padding: '4px', display: 'flex', background: '#FFF' }} >
        <div style={{ marginRight: '4px', width: '48px', height: '48px', background: '#FFF', overflow: 'hidden' }} >
          {user.has_logged_in &&
          <img src={user.user.image.src} alt={user.user.image.alt} width="100%" />
        }
        </div>
        <div style={{ flexGrow: 1 }}>
          <Input type="textarea" autosize={{ minRows: 3, maxRows: 6 }} style={{ width: '100%' }} />
          <div style={{ justifyContent: 'space-between', display: 'flex', margin: '4px 0px' }} >
            <Button icon="picture" shape="circle" />
            <Button>
              붸에에에에에에
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Write
