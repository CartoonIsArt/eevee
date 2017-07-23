import React, { Component } from 'react'
import { Affix, Input, Button } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

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
    return (
      <Affix>
        <nav className="Nav-wrapper">
          <div className="Nav" style={{ display: 'flex', flexDirection: 'row', alignContent: 'left' }}>
            <div style={{ width: '10%' }}>
              <Link className="ant-anchor-link-title" width="10%" to="/">
                <img height="44px" width="107px" src="https://cia.kw.ac.kr/media/logo.png" alt="logo" />
              </Link>
            </div>
            <div style={{ display: 'flex', width: '80%', padding: '7px' }}>
              <Search
                placeholder="검색(ex: 16기 김성우)"
                style={{ width: '50%' }}
              />
            </div>
            <div style={{ width: '10%', padding: '7px' }}>
              <Button
                icon="bulb"
                shape="circle"
                onClick={() => this.toggleMode()}
              />
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
