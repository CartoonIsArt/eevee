import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Sider from './Sider'
import Dashboard from './Dashboard'
import Noties from './Noties'
import Members from './Members'
import Law from './Law'
import Deactivate from './Deactivate'
import Logout from './Logout'
import Doorlock from './Doorlock'

class Evee extends Component {
  render() {
    const loc = this.props.location
    return (
      <div style={{ display: 'flex' }}>
        {loc.pathname !== '/' &&
        <Sider />
      }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/noties" component={Noties} />
        <Route path="/members" component={Members} />
        <Route path="/law" component={Law} />
        <Route path="/deactivate" component={Deactivate} />
        <Route path="/logout" component={Logout} />
        <Route path="/doorlock" component={Doorlock} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  router: state.router,
})
const mapDispatchToProps = ({
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Evee))
