import React, { Component } from 'react';
import logo from './logo.svg';
import Portal from './container/blacky/Portal'
import SingleFeed from './container/blacky/SingleFeed'
import './App.css';
import Nav from './container/eevee/Nav'
import Sider from './container/evee/Sider'
import Evee from './container/evee/Evee'
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
  thunk,
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
