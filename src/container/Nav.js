import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const Affix = require('antd/lib/affix')
const Button = require('antd/lib/button')
const Input = require('antd/lib/input')

class Nav extends Component {
  routeToRootPage() {
    const { location, history } = this.props
    if (location !== '/')
      history.push('/')
  }

  render() {
    const { Search } = Input;
    const { pathname } = this.props.location
    return (
      <Affix>
        <nav className="Nav-wrapper">
          <div className="Nav" style={{ display: 'flex', flexDirection: 'row', alignContent: 'left' }}>
            <div style={{ width: '10%' }}>
              <Link className="ant-anchor-link-title" width="10%" to="/">
                <Button onClick={() => this.routeToRootPage()}
                >
                  {/* <img height="44px" width="107px" src="https://cia.kw.ac.kr/media/logo.png" alt="logo" /> */}
                  <img height="44px" width="107px" src="https://avatars.githubusercontent.com/u/26453921?s=200&v=4" alt="logo" />
                </Button>
              </Link>
            </div>
            <div style={{ display: 'flex', width: '80%', padding: '7px' }}>
              <Search
                placeholder="검색 (회원 이름, 아이디, 글, 댓글)"
                style={{ width: '50%' }}
              />
            </div>
            <div style={{ width: '10%', padding: '7px' }}>
              <Link to={pathname === '/' ? '/dashboard' : '/'}>
                <Button
                  icon="bulb"
                  shape="circle"
                />
              </Link>
            </div>
          </div>
        </nav>
      </Affix>
    )
  }
}

Nav.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  router: state.router,
})
const mapDispatchToProps = ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
