import { Layout, notification, message } from 'antd'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { matchPath, withRouter } from 'react-router'
import { Redirect, Route, Switch } from 'react-router-dom'
import { clearAccount, clearAuth, getAccount } from './actions'
import Loading from './components/Loading'
import Navigation from './containers/Navigation'
import axios from './fetches/axios'
import { isEmptyObject } from './lib'
import { routes } from './Route'
import './App.scss'


const { Content } = Layout

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

const loginNotification = (account, birthdayMembers) => {
  if (!account.isActive) {
    notification.warning({
      message: '활동인구 신청',
      description: (<span>현재 비활동인구 상태입니다.<br/>활동인구 신청하세요!</span>),
    })
  }

  if (birthdayMembers.length !== 0)
  {
    birthdayMembers.forEach(birthdayMember => {
      notification.info({
        message: '축하합니다!',
        description: `오늘은 ${birthdayMember.student.nTh}기 ${birthdayMember.student.name}님의 생일이에요!`,
      })
    });
  }
}

class App extends Component {
  state = {
    auth: this.props.auth,
    loading: false,
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
          .catch((e) => message.error(`생일자 정보를 불러오는데 실패했습니다: ${e.message}`))
      }
      return false
    }
    return true
  }
  
  componentDidMount() {
    this.props.getAccount()
      .then(() => this.setState({ loading: true }))
      .catch(() => {
        this.props.clearAuth()
        this.setState({ loading: true })
      })
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
                        <Loading loading={this.state.loading}>
                          <Content id="container">
                            {route.sidebar}
                            {route.main}
                          </Content>
                        </Loading>
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
  clearAuth: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  account: state.account,
  auth: state.auth,
})
const mapDispatchToProps = ({
  getAccount,
  clearAccount,
  clearAuth,
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
