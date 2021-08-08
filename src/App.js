import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css';
import { routes } from './Route'
import { getAccount, notifyLogin } from './actions'
import Nav from './container/Nav'

const isNavEnabled = (history) => {
  const ignoredRoutes = routes.filter((route) => !route.has_navigator)
  return !ignoredRoutes.find(route => route.path == history.location.pathname)
}

const isAuthenticated = (route, account) => {
  return (route.is_public || account.has_logged_in)
}

const isPublicOnly = (route, account) => {
  return (route.is_public && account.has_logged_in)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: this.props.account
    }
  }

  componentDidMount() {
    this.props.getAccount()
    this.setState({ account: this.props.account })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.account !== this.props.account) {
      this.setState({ account: nextProps.account })
      return false
    }
    return true
  }

  componentDidUpdate() {
    if (this.state.account.has_logged_in)
      this.props.notifyLogin()
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
                  {isAuthenticated(route, this.state.account)
                    ? isPublicOnly(route, this.state.account)
                      ? <Redirect to='/' />
                      : [route.sidebar, route.main]
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
  account: PropTypes.object.isRequired,
  getAccount: PropTypes.func.isRequired,
  notifyLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
})
const mapDispatchToProps = ({
  getAccount,
  notifyLogin,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
