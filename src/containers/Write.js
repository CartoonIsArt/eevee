import React, { Component } from 'react'
import { Button, Input } from 'antd'

class Write extends Component {
  render() {
    return (
      <div style={{ marginBottom: '4px', padding: '4px', display: 'flex', background: '#FFF' }} >
        <div style={{ marginRight: '4px', width: '48px', height: '48px', background: '#00FF00' }}>
        </div>
        <div style={{ flexGrow: 1}}>
          <Input type='textarea' autosize={{minRows: 3, maxRows:6}} style={{ width: '100%' }} />
          <div style={{display: 'flex', margin: '4px 0px' }} >
            <Button icon='picture' shape='circle' />
            <div style={{flexGrow: 1}} />
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
