import React, { Component } from 'react'
import { Affix, Row, Col } from 'antd'


class Noties extends Component {
  render() {
    const iter = [1, 2, 3]
    return (
      <div style={{height: "192px"}}>
        <div style={{height: "25%"}}> noties  </div>
        {iter.map(i =>
          <div key={i} style={{height: "25%", display: "flex", alignItems: "stretch"}}> 
            <div style={{width: "48px", height: "48px"}}>
              pic
            </div>  
            <div style={{flexGrow: "2", display: "flex", alignItems: "stretch", flexDirection: "column"}}>
              <div > time </div>
              <div style={{flexGrow: "1"}}> asdf </div>
            </div>  
          </div>
        )}
      </div>
    )
  }
}

export default Noties
