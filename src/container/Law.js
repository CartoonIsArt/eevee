import React, { Component } from 'react'
import club_rules from '../terms/club_rules'

class Law extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '20px',
          margin: '10px',
          padding: '10px',
          wordWrap: 'break-word',
          whiteSpace: 'pre-line',
          overflowY: 'auto',
          height: '100%',
        }}>
        {club_rules}
      </div>
    )
  }
}

export default Law
