import { Affix, Col, Input, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import NavigationButton from '../components/NavigationButton'


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
            <Col xs={{ span: 5 }} sm={{ span: 4 }} lg={{ span: 6 }} xl={{ span: 5 }}>
              <NavigationButton pathname={this.props.history.location.pathname} />
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
