import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import { clearAccount, getAccount } from './actions'
import Nav from './container/Nav'
import { routes } from './Route'
import './App.css'


function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

const isNavEnabled = (history) => {
  const ignoredRoutes = routes.filter((route) => !route.has_navigator)
  return !ignoredRoutes.find(route => route.path == history.location.pathname)
}

const isAuthenticated = (route, auth) => {
  return (route.is_public || auth)
}

const isPublicOnly = (route, auth) => {
  return (route.is_public && auth)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: this.props.auth
    }
  }

  shouldComponentUpdate(nextProps) {
    if ((nextProps.auth !== this.props.auth)) {
      nextProps.auth
        ? this.props.getAccount()
        : this.props.clearAccount()
      return false
    }
    if (isEmptyObject(nextProps.account) !== isEmptyObject(this.props.account)) {
      this.setState({ auth: this.props.auth })
      return false
    }
    return true
  }
  
  render() {
    return (
      <div style={{ background: '#dfdfdf' }}>
        {isNavEnabled(this.props.history) && <Nav />}
        <div className="Container" style={{ marginTop: '4px', display: 'flex' }} >
          <Switch>
            {routes.map((route, idx) => (
            // eslint-disable-next-line
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                >
                  {isAuthenticated(route, this.state.auth)
                    ? isPublicOnly(route, this.state.auth)
                      ? <Redirect to='/' />
                      : [route.sidebar, route.main] // TODO: 이거 붙여야 에러 안뜨는데 넣으면 화면 비율 망가짐 .map((component, idx) => <div key={idx}>{(component)}</div>)
                    : <Redirect to='/login' />
                  }
                </Route>
            ))}
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  auth: PropTypes.bool.isRequired,
  account: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  clearAccount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
  auth: state.auth,
})
const mapDispatchToProps = ({
  getAccount,
  clearAccount,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
