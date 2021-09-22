import { Layout, notification } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { matchPath, withRouter } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import { clearAccount, getAccount } from './actions'
import Navigation from './containers/Navigation'
import axios from './fetches/axios'
import { routes } from './Route'
import './App.scss'
import ActionButton from 'antd/lib/modal/ActionButton'


const { Footer, Content } = Layout

function isEmptyObject(param) {
  return Object.keys(param).length === 0 && param.constructor === Object;
}

const isNavEnabled = (history) => {
  return Boolean(routes
    .filter((route) => route.has_navigation)
    .find((route) => matchPath(history.location.pathname, {
      path: route.path,
      exact: route.exact,
      strict: false,
    })))
}

const isAuthenticated = (route, auth) => {
  return (route.is_public || auth)
}

const isPublicOnly = (route, auth) => {
  return (route.is_public && auth)
}

const loginNotification = (account, members) => {
  if (!account.isActive) {
    notification.warning({
      message: '활동인구 신청',
      description: (<span>현재 비활동인구 상태입니다.<br/>활동인구 신청하세요!</span>),
    })
  }

  if (members.length !== 0)
  {
    members.forEach(member => {
      notification.info({
        message: '축하합니다!',
        description: `오늘은 ${member.student.nTh}기 ${member.student.name}님의 생일이에요!`,
      })
    });
  }
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

      if (isEmptyObject(this.props.account)) { // login 할 때만
        axios.get('/account/birthdayMembers')
          .then((r) => {
            const { accounts } = r.data
            loginNotification(nextProps.account, accounts)
          })
      }
      return false
    }
    return true
  }
  
  render() {
    return (
      <Layout id="app">
        <Navigation visible={isNavEnabled(this.props.history)} />
        <Content id="content">
          <Switch>
            {routes.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
              >
                {isAuthenticated(route, this.state.auth)
                  ? isPublicOnly(route, this.state.auth)
                    ? <Redirect to='/' />
                    : (
                      <Layout>
                        <Content id="container">
                          {route.sidebar}
                          {route.main}
                        </Content>
                      </Layout>
                    )
                  : <Redirect to='/login' />
                }
              </Route>
            ))}
          </Switch>
        </Content>
      </Layout>
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
