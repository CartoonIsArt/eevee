import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css';
import { routes } from './Route'
import { getUser, notifyLogin } from './actions'
import Nav from './container/Nav'

const isNavEnabled = (history) => {
  const ignoredRoutes = routes.filter((route) => !route.has_navigator)
  return !ignoredRoutes.find(route => route.path == history.location.pathname)
}

const isAuthenticated = (route, user) => {
  return (route.is_public || user.has_logged_in)
}

const isPublicOnly = (route, user) => {
  return (route.is_public && user.has_logged_in)
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: { has_logged_in: false }
    }
  }

  componentDidMount() {
    this.props.getUser()
    this.setState({ user: this.props.user })
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user })
      return false
    }
    return true
  }

  componentDidUpdate() {
    if (this.state.user.has_logged_in)
      this.props.notifyLogin()
  }
  
  render() {
    return (
      <div style={{ background: '#dfdfdf' }}>
        {isNavEnabled(this.props.history) && <Nav />}
        <div className="Container">
          {routes.map((route, idx) =>
            // eslint-disable-next-line
            (
              <div key={idx} style={{ display: 'flex' }}>
                <Route
                  path={route.path}
                  exact={route.exact}
                >
                  {isAuthenticated(route, this.state.user)
                    ? isPublicOnly(route, this.state.user)
                      ? <Redirect to='/' />
                      : [route.sidebar, route.main]
                    : <Redirect to='/login' />
                  }
                </Route>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  notifyLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
})
const mapDispatchToProps = ({
  getUser,
  notifyLogin,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
