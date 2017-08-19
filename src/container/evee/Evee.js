import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router-dom'
import Sider from './Sider'
import Dashboard from './Dashboard'
import Noties from './Noties'
import Members from './Members'
import Accounting from './Accounting'
import Cleaning from './Cleaning'
import OldNoties from './OldNoties'
import OldTexts from './OldTexts'
import Deactivate from './Deactivate'
import Logout from './Logout'
import Doorlock from './Doorlock'

class Evee extends Component {
  render() {
    const loc = this.props.location
    return (
      <div style={{ display: 'flex' }}>
        {(loc.pathname === '/dashboard' ||
         loc.pathname === '/noties' ||
         loc.pathname === '/members' ||
         loc.pathname === '/law' ||
         loc.pathname === '/deactivate' ||
         loc.pathname === '/logout' ||
         loc.pathname === '/doorlock') &&
         <Sider />
      }
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/noties" component={Noties} />
        <Route path="/accounting" component={Accounting} />
        <Route path="/cleaning" component={Cleaning} />
        <Route path="/members" component={Members} />
        <Route path="/old/noties" component={OldNoties} />
        <Route path="/old/texts" component={OldTexts} />
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
