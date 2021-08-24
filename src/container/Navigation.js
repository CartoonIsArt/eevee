import { Affix, Button, Col, Input, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'


class Navigation extends Component {
  render() {
    const { Search } = Input;
    const { visible } = this.props

    if (!visible)
      return <div />
      
    return (
      <Affix>
        <div id="Navigation-wrapper">
          <Row id="Navigation" type="flex" align="middle" justify="center">
            <Col xs={{ span: 4 }} lg={{ span: 6 }}>
              <Link to="/">
                <img id="Logo" src="https://avatars.githubusercontent.com/u/26453921?s=200&v=4" alt="logo" />
              </Link>
            </Col>
            <Col xs={{ span: 15 }} lg={{ span: 12 }}>
              <Search
                placeholder="검색 (회원 이름, 아이디, 글, 댓글)"
              />
            </Col>
            <Col xs={{ span: 5 }} sm={{ span: 4, offset: 1 }} lg={{ span: 3, offset: 3 }} xl={{ span: 2, offset: 4 }}>
              <Link to='/enrollment'>
                <Button style={{padding: '0 4px'}} icon="smile-o">활동인구</Button>
              </Link>
            </Col>
          </Row>
        </div>
      </Affix>
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  router: state.router,
})
const mapDispatchToProps = ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation))
