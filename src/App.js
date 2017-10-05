import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import Portal from './container/Portal'
import Login from './container/Login'
import SingleFeed from './container/SingleFeed'
import './App.css';
import Nav from './container/Nav'
import Evee from './container/Evee'
import reducers from './reducers'

const history = createHistory()
const middleware = applyMiddleware(
  routerMiddleware(history),
  thunk,
)

const store = createStore(
  reducers,
  middleware,
)


class App extends Component {

  static isNavEnabled() {
    const ignoredPaths = ['/login']
    return ignoredPaths.indexOf(history.location.pathname) === -1
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div style={{ background: '#dfdfdf' }}>
            { App.isNavEnabled() && (<Nav />) }
            <div className="Container" >
              <Route exact path="/" component={Portal} />
              <Route exact path="/login" component={Login} />
              <Route path="/feed/:id" component={SingleFeed} />
              <Evee />
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
