import React, { Component } from 'react'
import { Affix, Row, Col } from 'antd'


class Profile extends Component {
  render() {
    return (
      <div style={{height: "516px"}}>
        <div style={{height: "320px"}} > pic </div>
        <div style={{height: "98px", display: "flex", flexDirection: "row"}} >
          <div style={{width: "67%"}}>
            <div style={{height: "34%"}}> HHH </div>
            <div style={{height: "33%"}}> 123 </div>
            <div style={{height: "33%"}}> asdf </div>
          </div>
          <div style={{width: "33%"}}>
            btn
          </div>
        </div>
        <div style={{height: "98px", display: "flex", flexDirection: "row"}} >
          <div style={{width: "34%"}}>
            <div style={{height: "50%"}}> a </div>
            <div style={{height: "50%"}}> 1 </div>
          </div>
          <div style={{width: "33%"}}>
            <div style={{height: "50%"}}> b </div>
            <div style={{height: "50%"}}> 2 </div>
          </div>
          <div style={{width: "33%"}}>
            <div style={{height: "50%"}}> c </div>
            <div style={{height: "50%"}}> 3 </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
