import { Button, Col, Drawer, Row } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../Route'
import Sider from '../containers/Sider'


// TODO: url parameter나 query 있는 경우에도 적용할 수 있게
function hasNoSidebar(pathname) {
  const route = routes.find(route => route.path === pathname)
  if (route === undefined)
    return false
  return routes.find(route => route.path === pathname).sidebar.type === 'div'
}

class NavigationButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  showMenu = () => {
    this.setState({ visible: true })
  }

  hideMenu = () => {
    this.setState({ visible: false })
  }
  
  render() {
    const { pathname } = this.props

    return hasNoSidebar(pathname)
      ? (
        <Link to='/enrollment'>
          <Button id="active-members-button" icon="smile-o">활동인구</Button>
        </Link>
      )
      : (
        <Row>
          <Col xs={24} md={0}>
            <Button id="side-menu-button" icon="menu" onClick={this.showMenu}>메뉴</Button>
            <Drawer
              id="navigation-button"
              title="메뉴"
              width={240}
              placement="left"
              visible={this.state.visible}
              onClose={this.hideMenu}
            >
              <Sider isNavigationMenu={true} />
            </Drawer>
          </Col>
        </Row>
      )
  }
}

NavigationButton.propTypes = {
  pathname: PropTypes.string.isRequired,
}

export default NavigationButton
