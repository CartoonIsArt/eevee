import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

const Affix = require('antd/lib/affix')
const Button = require('antd/lib/button')
const Modal = require('antd/lib/modal')
const Input = require('antd/lib/input')

class Nav extends Component {
  toggleMode() {
    const loc = this.props.location
    const history = this.props.history
    if (loc.pathname === '/') {
      history.push('/dashboard')
    } else {
      history.push('/')
    }
  }
  render() {
    const Search = Input.Search;
    const pathname = this.props.location.pathname
    return (
      <Affix>
        <nav className="Nav-wrapper">
          <div className="Nav" style={{ display: 'flex', flexDirection: 'row', alignContent: 'left' }}>
            <div style={{ width: '10%' }}>
              <Link className="ant-anchor-link-title" width="10%" to="/">
                <Button onClick={() => {
                  Modal.success({
                    title: 'hello~',
                    content: 'hi~',
                    onOk() {},
                  },
                  );
                }}
                >
                  {/* <img height="44px" width="107px" src="https://cia.kw.ac.kr/media/logo.png" alt="logo" /> */}
                  <img height="44px" width="107px" src="https://avatars.githubusercontent.com/u/26453921?s=200&v=4" alt="logo" />
                </Button>
              </Link>
            </div>
            <div style={{ display: 'flex', width: '80%', padding: '7px' }}>
              <Search
                placeholder="검색(ex: 16기 김성우)"
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

const mapStateToProps = state => ({
  router: state.router,
})
const mapDispatchToProps = ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav))
