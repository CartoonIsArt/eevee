import { Card, Checkbox, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class TermAgreement extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <Card id="term-agreement-card">
        <Row>
          <Col id="term-agreement-name">
            <Checkbox checked={this.props.hasAgree} onChange={this.props.agree}>
              {this.props.name}
            </Checkbox>
          </Col>
          <Col id="term-agreement-text">
            {this.props.text}
          </Col>
        </Row>
      </Card>
    )
  }
}

TermAgreement.propTypes = {
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  hasAgree: PropTypes.bool.isRequired,
  agree: PropTypes.func.isRequired,
}

export default TermAgreement
