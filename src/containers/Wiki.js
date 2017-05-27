import React, { Component } from 'react'
import { Affix, Row, Col } from 'antd'


class Wiki extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div style={{height: "192px"}}>
        <div style={{height: "25%"}}> title  </div>
        {iter.map(i =>
          <div key={i} style={{height: "25%", display: "flex", alignItems: "stretch"}}> 
            <div style={{width: "75%"}}>
              title
            </div>  
            <div style={{width: "25%"}}>
              time
            </div>  
          </div>
        )}
      </div>
    )
  }
}

export default Wiki
