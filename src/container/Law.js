import { Card } from 'antd'
import React, { Component } from 'react'
import club_rules from '../common/club_rules'


class Law extends Component {
  render() {
    return (
      <Card id="law">
        {club_rules}
      </Card>
    )
  }
}

export default Law
