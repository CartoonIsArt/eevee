import React, { Component } from 'react'
import { Button } from 'antd'
import Line from '../components/Line'

class Doc extends Component {
  render() {
    const author = 'Smith'
    const text = 'Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge Discharge '
    return (
      <div style={{ height: '640px', padding: '8px' }} >
        <div style={{ display: 'flex' }} >
          <div>
            <a href="#"> james </a> like this
          </div>
          <div style={{ flexGrow: 2 }} />
          <div>
            <Button shape="circle" icon="down" size="small" />
          </div>
        </div>
        <Line />
        <div style={{ display: 'flex' }}>
          <div style={{ width: '48px',
            height: '48px',
            background: '#0000FF',
            marginRight: '4px',
          }}
          />
          <div style={{ flexGrow: 2 }} >
            <div style={{ fontSize: '14pt' }}> <a> {author} </a> </div>
            <div> 33 mins </div>
          </div>
        </div>
        <div>
          <p>
            {text}
          </p>
        </div>
        <div style={{ height: '320px', background: '#00FF00' }} />
        <Line />
        <div style={{ display: 'flex' }}>
          <div>
            <Button shape="circle" icon="like" size="small" />
            like it
          </div>
          <div>
            <Button shape="circle" icon="edit" size="small" />
            comment
          </div>
        </div>
      </div>
    )
  }
}

export default Doc
