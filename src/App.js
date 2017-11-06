import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './container/eevee/Nav'
import Evee from './container/evee/Evee'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { routes } from './Route'

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
              {routes.map((route, idx) =>
                (<div key={idx} style={{ display: 'flex' }}>
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.sidebar}
                  />
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                </div>))
              }
            </div>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
