import React, { Component } from 'react';
import logo from './logo.svg';
import Portal from './container/blacky/Portal'
import './App.css';
import Nav from './container/eevee/Nav'
import Sider from './container/evee/Sider'
import Dashboard from './container/evee/Dashoboard'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

const history = createHistory()
const middleware = applyMiddleware(
  routerMiddleware(history),
  thunk
)

const store = createStore(
  reducers,
  middleware,
)


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div style={{ background: '#dfdfdf' }}>
            <Nav />
            <div className="Container" >
              <Route exact path="/" component={Portal} />
              <div style={{ display: 'flex' }}>
                <Sider />
                <Route path="/dashboard" component={Dashboard} />
              </div>
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
