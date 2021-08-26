import { Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Activity extends Component {
  render() {
    const account = this.props.content
    return (
      <Row className="activity-container">
        <Col span={8}>
          글
          <Link
            className="ant-anchor-link-title"
            to={`/members/${account.username}`}
          >
            {account.documentsCount}
          </Link>
        </Col>
        <Col span={8}>
          댓글
          <Link
            className="ant-anchor-link-title"
            to={`/members/${account.username}/comments`}
          >
            {account.commentsCount}
          </Link>
        </Col>
        <Col span={8}>
          좋아요
          <Link
            className="ant-anchor-link-title"
            to={`/members/${account.username}/likes`}
          >
            {account.likedDocumentsCount}
          </Link>
        </Col>
      </Row>
    )
  }
}

Activity.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Activity
