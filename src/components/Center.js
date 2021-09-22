import { Row } from 'antd'
import React, { Component } from 'react'


class Center extends Component {
  render() {
    return (
      <Row type="flex" justify="center">
        <span>{this.props.children}</span>
      </Row>
    )
  }
}

export default Center
