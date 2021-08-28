import { Button, Card, Col, Row } from 'antd'
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'


class Page404 extends Component {
  render() {
    const backgroundStyle = {
      backgroundImage: 'url(/images/error.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '100vh',
    }
    return (
      <Card style={backgroundStyle}>
        <Row type="flex" align="bottom" justify="center" style={{ height: '80vh' }}>
          <Link to="/">
            <Button type="primary">메인 페이지로</Button>
          </Link>
        </Row>
      </Card>
    )
  }
}

export default withRouter(Page404)
