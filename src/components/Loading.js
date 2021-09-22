import { Card, Icon, Spin, Row } from 'antd'
import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Loading extends Component {
  render() {
    return (this.props.loading
      ? this.props.children
      : 
      <Card style={{ width: '100%', height: '100%' }}>
        <Row type="flex" align="middle" justify="center" >
          <Spin tip="불러오는 중..." indicator={<Icon type="loading" style={{ fontSize: '2.4rem' }} spin />} />
        </Row>
      </Card>
    )
  }
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
}

export default Loading
